const PasswordModel = require("../models/Password-Model");
const UserModel = require("../models/User-Model");

const getPasswords = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const userData = await PasswordModel.find({ userId });
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postPasswords = async (req, res) => {
  try {
    const { userId, username, site, password } = req.body;
    const userExist = await UserModel.findOne({ _id: userId });
    console.log(userExist, userId);
    if (userExist) {
      const passManager = await PasswordModel.create({
        userId,
        site,
        username,
        password,
      });
      return res.status(200).json(passManager);
    } else {
      res.status(404).json({ msg: "User Doesn't exist" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const deletePassword = async (req, res) => {
  try {
    const paramId = req.params.id;
    await PasswordModel.deleteOne({ _id: paramId });
    res.status(200).json("Delete Successfully");
  } catch (error) {
    res.status(404).json(error);
  }
};

const editPassword = async (req, res) => {
  try {
    const paramId = req.params.id;
    const updatedData = req.body;
    
      const updatedPassword = await PasswordModel.findOneAndUpdate(
        { _id: paramId },
        { $set :updatedData},
        
      );
      res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { getPasswords,postPasswords, deletePassword, editPassword };
