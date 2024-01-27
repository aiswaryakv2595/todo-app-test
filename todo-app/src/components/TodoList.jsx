import React from "react";
import { FaRegEdit, FaCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const TodoList = ({ title, status, editTodo, completeTodo, deleteTodo }) => {
  return (
    <div className="card mb-3 mt-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <div id={status ? "list-item" : ""}>{title}</div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="d-flex justify-content-end icons">
              <FaRegEdit
                className="fs-4 mx-2 text-primary"
                onClick={editTodo}
              />
              <FaCheckCircle
                className="fs-4 mx-2 text-success"
                onClick={completeTodo}
              />
              <MdDeleteOutline
                className="fs-4 mx-2 text-danger"
                onClick={deleteTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;