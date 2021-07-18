const express = require('express');
require("./db/mongoose");
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/tasks");
const Task = require('./models/tasks');

const app = express();
const port = process.env.PORT




app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter)










app.listen(port, () => {
    console.log("server is on port " + port);
})



// const main = async ()=>{
//     const user = await User.findById('60e8da09811b1743d017c25f')
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }


// main()

