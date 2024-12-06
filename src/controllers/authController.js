const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { userName, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ userName, password: hashedPassword, role });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: `User ${userName} created successfully` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const login =async (req,res)=>{
    try {
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        if(!user){
            res.status(404).json({message:`User ${userName} not found !!!`});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},process.env.JWT_SECRETE,{expiresIn:"1h"}
        );

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }

};

module.exports={
    register,
    login
}