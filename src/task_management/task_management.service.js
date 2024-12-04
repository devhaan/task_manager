const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
let tasksMap = new Map();
const tasksFile = path.join(__dirname, "tasks.json");

const loadTasksFromFile = () => {
  if (fs.existsSync(tasksFile)) {
    const data = fs.readFileSync(tasksFile, "utf8");
    const taskArray = JSON.parse(data);
    tasksMap = new Map(taskArray.map((task) => [task.id, task]));
  }
};

const saveTasksToFile = () => {
  const taskArray = Array.from(tasksMap.values());
  fs.writeFileSync(tasksFile, JSON.stringify(taskArray, null, 2));
};

const createTask = async (taskData) => {
  try {
    const { title, description } = taskData;

    const taskId = uuidv4();
    const newTask = {
      id: taskId,
      title,
      description,
      status: "pending",
    };
    loadTasksFromFile();
    tasksMap.set(taskId, newTask);
    saveTasksToFile();
    return newTask;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTasks = () => {
  try {
    loadTasksFromFile();
    return Array.from(tasksMap.values());
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = (taskId, taskData) => {
  try {
    loadTasksFromFile();

    if (!tasksMap.has(taskId)) {
        throw new Error("Task not found");
    }

    const { status } = taskData;

    const task = tasksMap.get(taskId);
    

    task.status = status;
    tasksMap.set(taskId, task);
    saveTasksToFile();
    return {
      message: "Task updated successfully",
      task,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    loadTasksFromFile();
    if (!tasksMap.has(taskId)) {
      throw new Error("Task not found");
    }

    tasksMap.delete(taskId);
    saveTasksToFile();

    return { message: "Task deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getFilteredTasks = async (status) => {
  try {
    loadTasksFromFile();

    const tasks = Array.from(tasksMap.values());
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(filteredTasks);
    return filteredTasks;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getFilteredTasks,
};
