import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../Middleware/RequestErrors/errors.js";
import Users from "../../Schemas/userSchema.js";
import War from "../../Schemas/War/war.js";
import Investment from "../../Schemas/Investments/investments.js";

import {
  GAMES,
  GOALS,
  INVESTMENTS,
  MEMBER_COUNT,
  DUES,
} from "../../Utils/Constants/constants.js";
import mongoose from "mongoose";

/*
=================
Validation Errors
=================
*/
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessage = errors.array().map((error) => error.msg);
        if (errMessage[0].startsWith("No Group with an Id")) {
          throw new NotFoundError(errMessage);
        }
        if (errMessage[0].startsWith("not authorized to access this route!")) {
          throw new UnauthorizedError(errMessage);
        }
        if (errMessage[0].startsWith("you already joined this group!")) {
          throw new BadRequestError(errMessage);
        }
        if (errMessage[0].startsWith("you can only delete yourself!")) {
          throw new BadRequestError(errMessage);
        }
        throw new BadRequestError(errMessage);
      }
      next();
    },
  ];
};

/*
=========
Register
=========
*/
export const validateRegister = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 4 })
    .withMessage("firstName must be at least 4 characters long! ")
    .trim(),
  body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 4 })
    .withMessage("lastName must be at least 8 characters long! ")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long! ")
    .trim(),
  body("state")
    .notEmpty()
    .withMessage("Name of State is required")
    .toLowerCase()
    .isLength({ min: 2, max: 2 })
    .withMessage("example:al ... example:ky")
    .trim(),
  body("city")
    .notEmpty()
    .withMessage("Name of city is required")
    .toLowerCase()
    .isLength({ min: 4, max: 30 })
    .withMessage("city name is too small or to large. 4-30 characters long!")
    .trim(),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("format must be xxx-xxx-xxxx")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await Users.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
]);

/*
======
Login
======
*/
export const loginUser = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long! ")
    .trim(),
]);

/*
====
WAR
====
*/

export const validateWarGroup = withValidationErrors([
  body("groupName").notEmpty().withMessage("Please provide a groupName"),
  body("players")
    .notEmpty()
    .withMessage("Please provide a number of players")
    .isNumeric()
    .withMessage("Please input numbers"),
  body("games").isIn(Object.values(GAMES)).withMessage("Invalid Game"),
  body("goals").isIn(Object.values(GOALS)).withMessage("Invalid Goal"),
  body("url").notEmpty().withMessage("please provide a discord link"),
]);

export const validateWarGroupId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");
    const warGroup = await War.findById(value);
    if (!warGroup)
      throw new NotFoundError(`No Group with an Id of ${value} exists!`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === warGroup.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route!");
  }),
]);

//Join Group
export const joinWarGroupId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");
    const warGroup = await War.findById(value);
    if (!warGroup)
      throw new NotFoundError(`No Group with an Id of ${value} exists!`);
    const user = mongoose.Types.ObjectId.createFromHexString(req.user.userId);
    const result = warGroup.joinedBy.find((person) => {
      return person.toString() === user.toString();
    });
    if (result) throw new BadRequestError("you already joined this group!");
  }),
]);

/*
=============
Investments
=============
*/

export const investmentValidation = withValidationErrors([
  body("groupName").notEmpty().withMessage("please provide a groupName"),
  body("desc").notEmpty().withMessage("please provide a description"),
  body("investment")
    .isIn(Object.values(INVESTMENTS))
    .withMessage("Invalid investment group"),
  body("members")
    .isIn(Object.values(MEMBER_COUNT))
    .withMessage("Invalid Member Count"),
  body("dues").isIn(Object.values(DUES)).withMessage("Invalid Price Of Dues"),
]);

export const alreadyJoined = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");
    const investGroup = await Investment.findById(value);
    if (!investGroup)
      throw new NotFoundError(`No Group with an Id of ${value} exists!`);
    const checkUser = req.user.userId;
    const user = investGroup.associate.find((person) => {
      return person._id.toString() === checkUser;
    });
    if (user) throw new BadRequestError("you already joined this group!");
  }),
]);
