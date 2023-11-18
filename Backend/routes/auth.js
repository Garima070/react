const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='garimaisagoodgirl'

//create a User using : POST "/api/auth/".Doesn't required auth
// ROUTE 1 - create a User using : POST "/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("name", "password must be atleast 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false
    //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether the user with this email exists already
    try {
        //check the same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry a user with this email already exists" });
      }


      const salt= await bcrypt.genSalt(10);
      const secpass= await bcrypt.hash(req.body.password,salt)
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      });   
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,authtoken})

    //   res.json(user)

      // ase enter a unique value for email',message:err.message})})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some errors occurs");
    }
  }
); 



//ROUTE 2 - Authenticate a User using : POST "/api/auth/login".No login required

router.post(
    "/login",
    [
      body("email", "enter a valid email").isEmail(),
      body("password", "password can't the blank").exists(),
    ],
    async (req, res) =>{

      let success=false
        //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"plss try to login with correct credentials"})
        }
        const passwordcompare= await bcrypt.compare(password,user.password)
        if(!passwordcompare)
        {
          let success=false
            return res.status(400).json({success,error:"plss try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
          }
          const authtoken=jwt.sign(data,JWT_SECRET)
          success=true
          res.json({success,authtoken})
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
          }
} )


//ROUTE 3 - get logged in a User detail using : POST "/api/auth/getuser".No login required

router.post(
    "/getuser", fetchuser, async (req, res) =>{
try{
    userid=req.user.id
    const user=await User.findById(userid).select("-password")
    res.send(user)
    
}catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
          }
        })



module.exports = router;
