const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const taskManagementRouter = require("./src/task_management/task_management.routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/", taskManagementRouter);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
