const { Users } = require("../../models");

const findAll = async (req, res) => {
  const users = await Users.find();

  res.status(200).json(users);
};

const findOne = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

const activate = async (req, res) => {
  await Users.findByIdAndUpdate(req.params.id, { active: true });

  res.status(200).json({ message: "User activated succesfully" });
};

const me = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { findAll, findOne, activate, me };
