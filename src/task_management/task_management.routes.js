
const express = require("express");
const router = express.Router();
const taskController = require("./task_management.controller");


router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.get("/tasks/status", taskController.getFilteredTasks);
router.put("/tasks", taskController.updateTask);
router.delete("/tasks", taskController.deleteTask);



module.exports = router;
