const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required!"));
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return next(createHttpError(400, "User already exists!"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "New user created!",
      data: newUser
    });

  } catch (error) {
    next(error);
  }
};



const login = async (req, res, next) => {
  try {
    console.log("LOGIN HIT");

    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "All fields are required!"));
    }
    
    console.log("EMAIL INPUT =", `"${email}"`);
console.log("PASSWORD INPUT =", `"${password}"`);

    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    console.log("INPUT:", password);
console.log("DB:", user.password);



    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH =", isMatch);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid Credentials h bsdk"));
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { _id: user._id },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );
    console.log("SECRET =", config.accessTokenSecret);


    // Set cookie
 res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30
});

    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: user
    });

  } catch (error) {
    next(error);
  }
};


const getUserData = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id);
        res.status(200).json({success: true, data: user});

    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        
        res.clearCookie('accessToken');
        res.status(200).json({success: true, message: "User logout successfully!"});

    } catch (error) {
        next(error);
    }
}




module.exports = { register, login, getUserData, logout }