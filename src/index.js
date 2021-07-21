const app = require("./app");
const port  = process.env.PORT;
app.listen(port, () => {
    console.log("server is on port " + port);
})



// const main = async ()=>{
//     const user = await User.findById('60e8da09811b1743d017c25f')
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }


// main()

