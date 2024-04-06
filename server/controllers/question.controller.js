const mongoose = require("mongoose");
const Question = require("../models/question.model");

const AskQuestion = async (req, res) => {
  try {
    const postQuestionData = req.body;

    const postQuestion = await new Question(postQuestionData);
    const postedQuestion = await postQuestion.save();

    res.status(200).json({
      success: true,
      message: "Posted question successfully",
      data: postedQuestion,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: `Failed to post a new question ${error} `,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Question.find({});
    if (questionList.length === 0) {
      res.status(404).json({
        success: false,
        message: "No questions in DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched questions",
      data: questionList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server error ${error} `,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Question unavailable",
      });
    }

    const updatedDb = await Question.findByIdAndDelete(id);
    console.log(updatedDb);

    res.status(200).json({
      success: false,
      message: "Successfully Deleted...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete question ${error.message} `,
    });
  }
};

const voteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Question unavailable",
      });
    }

    const question = await Question.findById(id);

    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }

    await Question.findByIdAndUpdate(id, question);

    res.status(200).json({
      success: true,
      message: "Voted successfully...",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "id not found...",
    });
  }
};

module.exports = {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
};
