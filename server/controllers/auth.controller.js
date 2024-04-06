const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../models/auth.model");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "User already Exist.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      result: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong... ${error.message} `,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User don't Exist.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      result: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

module.exports = {
  signup,
  login,
};
