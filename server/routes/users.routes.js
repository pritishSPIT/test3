const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const {
  getAllUsers,
  updateProfile,
} = require("../controllers/users.controller");
const { auth } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.get("/getAllUsers", getAllUsers);
userRouter.patch("/update/:id", auth, updateProfile);

module.exports = userRouter;
