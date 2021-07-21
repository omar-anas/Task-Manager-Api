const express = require('express');
require("./db/mongoose");
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/tasks");
const Task = require('./models/tasks');

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter)

module.exports=app;