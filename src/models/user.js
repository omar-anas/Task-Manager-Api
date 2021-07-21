const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./tasks');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },

   email:{
       type:String,
       unique:true,
       required:true,
       trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("this is invalid email");
            }
        }
   },
   age:{
       
       type:Number,
       trim:true,
       default:0,
       validate(value){
           if(value<0){
               throw new Error("please enter your age");
           }

       }
   },
   password:{
       required:true,
       type:String,
       trim:true,
       minlength:7,
       validate(value){
           if(value.toLowerCase().includes("password")){
               throw new Error("please enter strong password");
           }
        
       }

   },Tokens:[{
       token:{
            type:String,
            required:true

       }
   }],avatar:{
       type:Buffer
   }


 },{
     timestamps:true
 })

userschema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userschema.methods.generateToken= async function(){
    const user = this;
    const token =await jwt.sign({_id:user._id.toString()},"mysigniture")
    user.Tokens=user.Tokens.concat({token});
    await user.save();
    return token;
}



userschema.methods.toJSON = function(){
    const user = this;
    const userObject=user.toObject()
   
     delete userObject.Tokens;
     delete userObject.password;
     delete userObject.avatar;
    return userObject;
}




userschema.statics.findByCredintials = async (email,password)=>{
    const user =await User.findOne({email});
    if(!user){
        throw new Error ('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error ('unable to login')
    }
    return user;
}


// hash plainText password before saving mongoose middleware
userschema.pre('save',async function(next){
    const user =this;
    
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next();
})

// removing all tasks before deleting user mongoose middleware
userschema.pre('remove',async function(next){
    const user = this 
    await Task.deleteMany({owner:user._id});
    next();
})


const User=mongoose.model("User",userschema)

module.exports=User;