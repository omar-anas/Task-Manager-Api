const express = require('express');
const multer =require('multer');
const sharp = require('sharp');
const {sendWelcomingEmail, sendCancelationEmail}= require('../emails/account');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomingEmail(user.email,user.name);
        token = await user.generateToken();
        res.status(201).send({user , token})

    } catch (e) {
        res.status(400).send();

    }

})



// search user db 
router.get("/users/me", auth,async (req, res) => {
    res.send(req.user);

})
//seach user by id
router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(500).send("error");
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
})


// login 
router.post('/users/login',async(req,res)=>{
    try{
    const user =await User.findByCredintials(req.body.email,req.body.password);
    const token = await user.generateToken();
    res.status(201).send({user , token});
    }catch(e){
        res.status(400).send(e);
    }

})

//logout 
router.post("/users/logout",auth,async(req,res)=>{
    
    try{

        req.user.Tokens=req.user.Tokens.filter((tokens)=>{
            return tokens.token !== req.token;
        })
        await req.user.save();
        res.send(req.user.Tokens);
    }catch(e){
        res.status(500).send();
    }
})
//logout all
router.post('/users/logoutall',auth,async (req,res)=>{
    try{
    req.user.Tokens=[];
    await req.user.save();
    res.status(200).send();
    }catch(e){
        res.status(500).send()
    }
})


router.patch("/users/me", auth,async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "email", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" });
    }
    try {
        //const user = await User.findById(req.user._id);
        updates.forEach((update)=>{
            req.user[update]=req.body[update];
        })
        await req.user.save();

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }


})




router.delete("/users/me",auth, async(req, res) => {
    
    try {
        //const user = await User.findByIdAndDelete(req.params.id);
        sendCancelationEmail(req.user.email,req.user.name);
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send()
    }
})

//upload file using multer npm ,it can be uploaded to system file or processed and stored in database as binary file

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error("please upload png , jpg ,jpeg image"))
        }
        cb(undefined,true);
    }
})



router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer();
    req.user.avatar=buffer; 
    //req.user.avatar = req.file.buffer; with no shaping or converting to png format 
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
  res.status(400).send({"error":error.message});  
})

//serving up profile pic
router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);

        if(!user ||!user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar);
        
    } catch (error) {
        res.status(404).send()
    }
})


//deleting profile pic
router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})

module.exports=router;