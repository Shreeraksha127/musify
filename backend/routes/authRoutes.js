import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator'
import User from '../models/User.js'

const router = express.Router();
router.post("/register",[body('username').notEmpty(),
body('email').isEmail(),
body('password').isLength({min:6})],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{username,email,password}=req.body;
    try{
        let user=await User.findOne({ email: req.body.email });
        if (user){
            return res.status(400).json({error:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user=new User({username,email,password:hashedPassword});
        await user.save();
        res.json({message:"User created successfully"});
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
}
);
router.post("/login",[body('email').isEmail(),
    body('password').exists()],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }           
        const{email,password}=req.body;
        try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id},'your_jwt_secret',{expiresIn:'1h'});
        res.json({token});
    }
    catch(err){
        res.status(500).send("Server error");
    }
}
);
export default router;