import { StatusCodes } from "http-status-codes";
import Investment from "../../Schemas/Investments/investments.js";

export const getUserGroups = async (req, res) => {
  const user = await Investment.find({ president: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

export const getAllUserGroups = async (req, res) => {
  const group = await Investment.find({ joinedBy: req.user.userId });
  res.status(StatusCodes.OK).json({ group });
};