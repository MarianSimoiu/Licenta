import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sgMail from '@sendgrid/mail'
import cors from 'cors'

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVaccinated: user.isVaccinated,
      pic: user.pic,
      persmission: user.permission,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }else{
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const user = new User({name, email, password})
      const createdUser = await user.save()
      res.status(201).json(createdUser);
    }}
  
  /*
  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      isVaccinated: user.isVaccinated,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
  */
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private

const addPermission = asyncHandler(async (req, res) => {
  const {userId, userName} = req.body;

  const user = await User.findById(req.params.id);
  
  if(user) {
    if (!Array.isArray(user.permission))
      user.permission = [];
    user.permission.push(userName);

    const updatedUser = await user.save();
    res.json(updatedUser);

  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
 })

const updateStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if(user){
    user.isVaccinated = true;
    const updatedUser = await user.save();
    res.json(updatedUser)
  }else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!Array.isArray(user.permission))
      user.permission = [];

  if (!Array.isArray(user.vaccination))
      user.permission = [];
  
  if (user) {
    if (req.body.permissionArray[0] == "add")
      user.permission.push(req.body.permissionArray[1]);
    
    if (req.body.permissionArray[0] == "delete"){
      var newPermission = arrayRemove(user.permission, req.body.permissionArray[1]);
      user.permission = newPermission
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;


    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      permission: updatedUser.permission,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getUsers = asyncHandler(async (req,res) => {
  const users = await User.find();
  res.json(users);
})

const sendEmail = asyncHandler(async (req, res) =>{
  const{ recipient, sender, topic, html} = req.query;
  

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: recipient,
    from: sender,
    subject: topic,
    html: html,

  }
  sgMail.send(msg)
    .then((msg) =>console.log("Email sent"))
})

export { authUser, updateUserProfile, registerUser, getUsers, addPermission, sendEmail, updateStatus};
