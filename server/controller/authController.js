import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// Register a new admin
export const register = async (req, res) => {


  const { name, formattedDate, email, password } = req.body;


  if (!name || !formattedDate || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const existingUser = await User.findOne({ $or: [{ email: email }] });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      dateOfBirth : formattedDate,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};







// Login as an admin
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  try {
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    const match = await bcrypt.compare(password, savedUser.password);
    if (match) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET_KEY);
      const { _id, name, email } = savedUser;
      res.json({ token, user: { _id, name, email } });
    } else {
      return res.status(422).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server  error" });
  }
};



//getUser
export const getUser = async(req,res)=>{

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

}

//verify user



export const VerifyUser = async(req,res)=>{

  console.log({ "Verify User"   : req.headers});

  try {
    const authHeader = req.headers.authorization;

    // console.log({ "authHeader"   : authHeader});


    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. Token required.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ authenticated: true });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
