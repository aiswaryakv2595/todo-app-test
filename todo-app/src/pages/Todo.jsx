import React, { useEffect, useState } from "react";
import { todoApi } from "../utils/handleApi";
import { FaRegEdit, FaCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import TodoList from "../components/TodoList";

const TodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const fetchTodo = async () => {
    const response = await todoApi.getTodo();
    setTodo(response);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: TodoSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (formik.isValid) {
          if (formik.values.title.trim()) {
            const response = isUpdating
              ? await todoApi.updateTodo(updateId, {
                  title: formik.values.title,
                })
              : await todoApi.addTodo({ title: formik.values.title });

            if (response) {
              fetchTodo();
              resetForm();
              setIsUpdating(false);
              setUpdateId(null);
            }
          }
        }
      } catch (error) {
        console.error(
          `Error ${isUpdating ? "updating" : "adding"} todo:`,
          error
        );
      }
    },
  });

  const handleDelete = async (updateId) => {
    try {
      await todoApi.deleteTodo(updateId);
      fetchTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleComplete = async (updateId) => {
    try {
      await todoApi.completeTodo(updateId);
      fetchTodo();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEdit = (todoId, todoTitle) => {
    setIsUpdating(true);
    setUpdateId(todoId);
    formik.setValues({ title: todoTitle });
  };

  return (
    <>
      <header className="container-fluid">
        <div className="row">
          <div className="col-12 bg-dark text-white d-flex justify-content-center p-1">
            <h1>Todo list</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="d-flex flex-column align-items-center mt-3">
          <div className="w-75">
            <h4 className="text-center p-3">Add todos</h4>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="title"
                  value={formik.values.title}
                  placeholder="Title"
                  onChange={formik.handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  {isUpdating ? "Update" : "Add"}
                </button>
              </div>
              {formik.touched.title && formik.errors.title && (
                <label htmlFor="title" className="error text-danger">
                  {formik.errors.title}
                </label>
              )}
            </form>
            <div className="todos">
              {todo &&
                todo.map((list) => (
                  <TodoList
                    key={list._id}
                    title={list.title}
                    status={list.status}
                    editTodo={() => handleEdit(list._id, list.title)}
                    completeTodo={() => handleComplete(list._id)}
                    deleteTodo={() => handleDelete(list._id)}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;