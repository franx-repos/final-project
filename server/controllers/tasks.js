import Task from "../models/tasksSchema.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const task = await Task.find();
    if (!task.length) {
      throw { statusCode: 404, message: "Task not found" };
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }
    res.json(task);
  } catch (error) {}
};

export const addNewTask = async (req, res, next) => {
  const { sowo_id, name, house, timeOfArrival } = req.body;

  try {
    const newTask = new Task({ sowo_id, name, house, timeOfArrival });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { sowo_id, name, house } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { sowo_id, name, house, timeOfArrival },
      { new: true }
    );
    if (!updatedTask) {
      throw { statusCode: 404, message: "Task not found" };
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const addTagToTask = async (req, res, next) => {
  const { id } = req.body;
  const { tag } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }
    task.tags.push(tag);
    const updateTask = await task.save();
    res.json(updateTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task was deleted" });
  } catch (error) {
    next(error);
  }
};
