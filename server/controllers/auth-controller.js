const UserModel = require("../models/User-Model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExisted = await UserModel.findOne({ email });
    if (userExisted) {
      res.status(400).json("User Already exist please login");
    }

    const userCreated = await UserModel.create({
      username,
      email,
      password,
    });
    res
      .status(200)
      .json({
        msg: "Registration Successfull",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(400).json({ msg: error });
    // next(error)
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExisted = await UserModel.findOne({ email });
    if (!userExisted) {
      return res.status(400).json({ msg: "User not registered" });
    }
    const user = await userExisted.comparePassword(password);
    if (user) {
      res
        .status(200)
        .json({
          msg: "login Successfull",
          token: await userExisted.generateToken(),
          userId: userExisted._id.toString(),
        });
    }
    else{
        res.status(200).json({msg:"Invalid email and password"})
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const user = async(req,res) =>{
    try {
        const userData = req.user
        return res.status(200).json(userData)
    } catch (error) {
        res.status(401).json({msg:"Unauthorized Access"})
    }
}

module.exports = { register ,login,user};
