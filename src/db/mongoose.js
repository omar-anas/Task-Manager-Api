

const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})




// const User=mongoose.model("User",{
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },

//    email:{
//        type:String,
//        required:true,
//        trim:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("this is invalid email");
//             }
//         }
//    },
//    age:{
//        required:true,
//        type:Number,
//        trim:true,
//        default:0,
//        validate(value){
//            if(value<0){
//                throw new Error("please enter your age");
//            }

//        }
//    },
//    password:{
//        required:true,
//        type:String,
//        trim:true,
//        minlength:7,
//        validate(value){
//            if(value.toLowerCase().includes("password")){
//                throw new Error("please enter strong password");
//            }
        
//        }

//    }



// })

// const user =new User({
//     name:"omar",
//     age:19,
//     email:"omar_anas@yahoo.com",
//     password:"zxc123456789 "

// })

// user.save().then((user)=>{
//     console.log(user)
// }).catch((error)=>{
//     console.log(error);
// })











// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim:true,
//         required:true
//     },
//     completed: {
//         type: Boolean,
//         default:false
//     }
// })


// const task = new Task({
//     description: 'learn mongoose',
//     completed: true

// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })