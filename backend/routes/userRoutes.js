const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try{
        const user= await User.create({name, email, password: hashed});
        res.json({token:jwt.sign({id: user._id}, process.env.JWT_SECRET)});
    }
    catch{
        res.status(400).json({message: "User exist or error"});
    }
});

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        res.json({token:jwt.sign({id: user._id}, process.env.JWT_SECRET)})
    }
    else{
        res.status(401).json({message: "Invalid credentials"});
    }
});

module.exports = router;