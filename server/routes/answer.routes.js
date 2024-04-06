const express = require("express");
const answerRouter = express.Router();
const {
  postAnswer,
  deleteAnswer,
} = require("../controllers/answers.controller.js");
const { auth } = require("../middlewares/auth.middleware.js");

answerRouter.patch("/post/:id", auth, postAnswer);
answerRouter.patch("/delete/:id", auth, deleteAnswer);

module.exports = answerRouter;
