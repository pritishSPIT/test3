const express = require("express");

const questionRouter = express.Router();

const {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} = require("../controllers/question.controller");
const { auth } = require("../middlewares/auth.middleware");

questionRouter.post("/Ask", auth, AskQuestion);
questionRouter.get("/get", getAllQuestions);
questionRouter.delete("/delete/:id", auth, deleteQuestion);
questionRouter.patch("/vote/:id", auth, voteQuestion);

module.exports = questionRouter;
