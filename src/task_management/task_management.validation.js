const taskService = require("./task_management.service");


const getFilteredTasks = async (req, res) => {
    const { status } = req.query;
    if (status !== "pending" && status !== "completed") {
      throw new Error(`Status must be either "pending" or "completed"`);
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
};

const updateTask = async (req, res) => {
    if(!req.query.id) {
        throw new Error('Id must Required');
    }
    const { status } = req.body;
    if (status !== "pending" && status !== "completed") {
      throw new Error('Status must be either "pending" or "completed"');
    }
    
};


module.exports = {
  createTask,
  updateTask,
  getFilteredTasks,
};
