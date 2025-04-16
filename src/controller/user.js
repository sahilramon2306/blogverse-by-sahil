const userModel = require('../model/user.js');
const passwordLib = require("../libs/passwordLib.js")
const tokenLib = require('../libs/tokenLib.js')
require("dotenv").config(); // Ensure dotenv is loaded

// User registration
const registration = async (req, res) => {
   const { name, email, password } = req.body;
   const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ success: false, message: "This email is already registered, try a new email." });
    }
    const hashedPassword = await passwordLib.getHashed(password);

    let newUser = new userModel({
       name: name,
       email: email,
       password: hashedPassword // Store hashed password
    });
    await newUser.save();
    res.status(200).send({success: true, message:`User-${name}, registered successfully.`});
} 

//-------------------------------------------------------------------------------------------------

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
      return res.status(200).send({ success: false, message: "Email is not registered", data:{}});
  }
  const isMatch = await passwordLib.passwordVerify(password,existingUser.password);

  if (!isMatch) {
      return res.status(200).send({ success: false, message: "Password is not match", data:{}});
  }
  const token = await tokenLib.generateToken(existingUser);
  
  res.status(200).json({success: true, message: "Login successful!", data:{token}});
};

//-----------------------------------------------------------------------------------------------------
//Password Update
const updatePassword = async(req,res) => {
  const {email,password} = req.body;
  console.log(req.body);
  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
      return res.status(400).json({ success: false, message: "Email is not registered." });
  }
  if(!password){
    return res.status(400).send({success: false, message: "Provide proper data."});
  }
  const hashedPassword = await passwordLib.getHashed(password);
  const updatepassword = await userModel.findOneAndUpdate(
    { email: email },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  if (!updatepassword) {
    return res.status(404).send({success: false, message: `${email} does not exist in the database.`});
  }
  res.status(200).send({ success: true, message: "Password updated successfully", updatepassword });

}




module.exports = {
  registration: registration,
  login: login,
  updatePassword : updatePassword
};
