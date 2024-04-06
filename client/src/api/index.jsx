import axios from "axios";

const API = axios.create({
  baseURL: "https://stackoverflow-clone-backend-sonu-api.vercel.app",
});

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("Profile")).token
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const logIn = (authData) => API.post("/user/login", authData);

export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);

export const getAllQuestions = () => API.get("/questions/get");

export const deleteQuestions = (id) => API.delete(`/questions/delete/${id}`);

export const voteQuestion = (id, value, userId) => {
  return API.patch(`/questions/vote/${id}`, { value, userId });
};

export const postAnswer = (
  id,
  noOfAnswers,
  answerBody,
  userAnswered,
  userId
) => {
  return API.patch(`/answer/post/${id}`, {
    id,
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
};

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
