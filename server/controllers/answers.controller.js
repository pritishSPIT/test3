const mongoose = require("mongoose");
const Question = require("../models/question.model");

const postAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "question unavailable...",
      });
    }

    updateNoOfQuestions(id, noOfAnswers);

    const updatedQuestion = await Question.findByIdAndUpdate(id, {
      $addToSet: {
        answer: [{ answerBody, userAnswered, userId }],
      },
    });

    res.status(200).json({
      success: true,
      message: "answering successfull",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to find question ${error.message}`,
    });
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "question unavailable...",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(404).json({
        success: false,
        message: "answer unavailable...",
      });
    }

    updateNoOfQuestions(id, noOfAnswers);

    await Question.updateOne(
      { _id: id },
      { $pull: { answer: { _id: answerId } } }
    );

    res.status(200).json({
      success: true,
      message: "Successfully deleted...",
    });
  } catch (error) {
    res.status(405).json({
      success: false,
      message: `error.message`,
    });
  }
};

module.exports = {
  postAnswer,
  deleteAnswer,
};
