import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // remove password before sending
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: userData
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const Login = async (req,res)=>{
try {
        const {email,password}=req.body;

        if (!email || !password) {
  return res.status(400).json({ message: "All fields are required" });
}

    //find user 
    const existed = await User.findOne({email})
    if(!existed){
        return res.status(400).json({message:"INVALID CREDENTIALS"})

    }

    //compare password
    const isMatch = await bcrypt.compare(password,existed.password)

    if(!isMatch){
        return res.status(400).json({message:"INVALID CREDENTILAS"})
    }
    // generate token
const token =jwt.sign({ id: existed._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

const userData = {
  _id: existed._id,
  username: existed.username,
  email: existed.email
}

return res.status(200).json({
  message: "Login successful",
  token,
  user: userData
})



    
} catch (error) {
     return res.status(500).json({ message: "Internal Server Error" });
    
}

}

export { Signup ,Login };