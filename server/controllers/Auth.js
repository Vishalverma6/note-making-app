const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



// signup 
exports.signup = async(req, res)=> {
    try{
        // fetch the data from req body
        const {
            fullName,
            email,
            password,
            confirmPassword,
        } = req.body;

        console.log("fullName",fullName)
        console.log("fullName",email)
        console.log("fullName",password)
        console.log("fullName",confirmPassword)
        // validation
        if(!fullName || !email || !password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are Required",
            })
        }

        // password matching 
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmPassword  does not Matched, Please try again ",
            });
        }

        // check user already exist or not 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered, Please try to login",
            });
        }

        // hashing of password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashed password",hashedPassword)

        // entry creation in Database
        const user = await User.create({
            fullName,
            email,
            password:hashedPassword,
        });

        // return response 
        return res.status(200).json({
            success:true,
            message:"Signup Successful, Please Login",
            data:user,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,Please try again",
        });
    }
}

// login
exports.login = async(req, res) => {
    try{
        // get data from req body
        const {email,password}=req.body;

        // validation of data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ,please try again",
            });
        }

        // user check exist or not
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered ,Please signup first",
            });
        }

       // generate Jwt ,after password matching 
       if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            
            // create cookie and send response 
            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token, options).status(200).json({
                success:true,
                message:"Logged In Successfully",
                token,
                user,
            })
       }
       else{
        return res.status(401).json({
            success:false,
            message:"Password Incorrect",
        });
       }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure ,Please try again",
        });
    }
}