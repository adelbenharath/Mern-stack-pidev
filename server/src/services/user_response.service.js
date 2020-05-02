const UserResponse = require("../models/user_response");
const mongoose = require("mongoose");
const User = require("../models/user");
const Question = require("../models/question");
const Form =require("../models/form");
const Study =require("../models/study");

class UserResponseService {}

UserResponseService.prototype.getAll = async (req, res) => {
  const userResponses = await UserResponse.find();
  res.json(userResponses);
};

UserResponseService.prototype.getById = async (req, res) => {
  let id = req.params.id;
  const userResponse = await UserResponse.findById(id);
  res.json(userResponse);
};

UserResponseService.prototype.add = async (req, res) => {
  let model = new UserResponse(req.body);
  model._id = mongoose.Types.ObjectId();
  const userResponse = await model.save();
  res.json(userResponse);
};

UserResponseService.prototype.delete = async (req, res) => {
  let id = req.body._id;
  const userResponse = await UserResponse.findOneAndDelete(id);
  res.json(userResponse);
};

UserResponseService.prototype.getByQuestion = async (req, res) => {
  const userResponses = await UserResponse.find({
    question: { _id: req.params.id},
  });
  res.json(userResponses);
};

UserResponseService.prototype.getAnswersVolume = async (req, res) => {
  const userResponses = await UserResponse.find({
    question: { _id: req.params.id},
  });
  let answersVolumeMap = [];
  let answers=[];
  userResponses.map((element) => {
    if (answers.includes(element.text)) {
      answersVolumeMap.map((e) => {
        if (e.answer == element.text) e.volume++;
      });
    } else {
      answers.push(element.text);
      answersVolumeMap.push({ answer: element.text, volume: 1});
    }
  });
  res.json(answersVolumeMap);
};

UserResponseService.prototype.getMostActiveUsersIds = async () => {
  const filter = await UserResponse.aggregate([  
        {$group: {_id: "$user", count: { "$sum": 1}}},
        {$sort: {count: -1}},
        {$limit: 5} 
  ]);
  return filter;
};

UserResponseService.prototype.getLatestUserResponse = async (req, res) => {
  let userResponse= await UserResponse.findOne({}, {}, { sort: { 'createdAt' : -1 } });
  let user = await User.findById(userResponse.user); 
  let question = await Question.findById(userResponse.question); 
  let form = await Form.findById(question.form); 
  let study = await Study.findById(form.study); 
  res.json({"text":userResponse.text,"userEmail":user.email,"questionText":question.text,"formTitle":form.title,"studyName":study.name});
}
module.exports = UserResponseService;
