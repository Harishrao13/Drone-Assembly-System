const User = require("../models/users");

const getAllTasks = (req, res) => {
  res.send("Hello from Controller!");
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//find User by id
const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email parameter is missing" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(`Error finding user: ${error.message}`);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getAllTasks,
  createUser,
  findUser,
};