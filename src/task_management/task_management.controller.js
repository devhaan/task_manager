const taskService = require("./task_management.service");
const taskValidation = require("./task_management.validation");

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getFilteredTasks = async (req, res) => {
  try {
    taskValidation.getFilteredTasks(req, res);

    const tasks = await taskService.getFilteredTasks(req.query.status);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    taskValidation.createTask(req, res);

    const task = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    taskValidation.updateTask(req, res);
    const task = await taskService.updateTask(req.query.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.query.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getFilteredTasks,
};
