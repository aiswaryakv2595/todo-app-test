import Todo from "../models/todoModel.js";
import validateMongoDbid from "../utils/validateMongodbId.js";

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const existing = await Todo.findOne({ title: title });
    if (existing) {
      return res.status(400).json({ message: "Todo already exists" });
    } else {
      const savedData = new Todo({
        title: title,
      });

      await savedData.save();
      res.status(201).json(savedData);
    }
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllTodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(201).json(todo);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    validateMongoDbid(id);
    const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateTodo);
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbid(id);
    const deleteTodo = await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteTodo);
  } catch (error) {
    throw new Error(error);
  }
};
export const CompleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbid(id);
    let status;
    const todo = await Todo.findById(id);
    status = todo.status ? false : true;
    const completeTodo = await Todo.findByIdAndUpdate(id, {
      $set: { status: status },
    });
    res.status(200).json(completeTodo);
  } catch (error) {
    throw new Error(error);
  }
};
