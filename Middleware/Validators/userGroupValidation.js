import { body, param, validationResult } from "express-validator";
import { BadRequestError, UnauthorizedError } from "../RequestErrors/errors.js";
import { CATEGORY, POSITION } from "../../Utils/Classes/class.js";
import mongoose from "mongoose";
import Subgroup from "../../Schemas/UserDashboard/subGroup.js";
import Member from "../../Schemas/Investments/member.js";
import Investment from "../../Schemas/Investments/investments.js";
//Validate Errors
export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessage = errors.array().map((error) => error.msg);
        if (errMessage[0].startsWith("this id is not valid")) {
          throw new BadRequestError(errMessage);
        }
        if (errMessage[0].startsWith("Mongo Id is not valid!")) {
          throw new BadRequestError(errMessage);
        }
        if (errMessage[0].startsWith("group does not exist!")) {
          throw new BadRequestError(errMessage);
        }
        if (errMessage[0].startsWith("president cant be team leader!")) {
          throw new BadRequestError(errMessage);
        }
        if (errMessage[0].startsWith("only one person can be treasurer")) {
          throw new BadRequestError(errMessage);
        }
        if (
          errMessage[0].startsWith(
            "you can only have one team leader per group!"
          )
        ) {
          throw new BadRequestError(errMessage);
        }
        if (
          errMessage[0].startsWith("this player already joined this subgroup")
        ) {
          throw new UnauthorizedError(errMessage);
        }
        if (errMessage[0].startsWith('this is not a valid id"')) {
          throw new UnauthorizedError(errMessage);
        }

        throw new BadRequestError(errMessage);
      }
      next();
    },
  ];
};

//Create Headline
export const createHeadlineValidate = withValidationErrors([
  body("category")
    .isIn(Object.values(CATEGORY))
    .withMessage("please pick a category"),
  body("headline").notEmpty().withMessage("please choose a headline"),
  body("desc")
    .notEmpty()
    .withMessage("please fill out a description")
    .isLength({ min: 20 })
    .withMessage("please write at least 20 characters!"),
]);
//Delete Headline
export const deleteHeadlineValidate = withValidationErrors([
  param("id").custom(async (value) => {
    const headline = mongoose.Types.ObjectId.isValid(value);
    if (!headline) throw new BadRequestError("this id is not valid");
  }),
]);

//Create Schedule
export const createScheduleValidate = withValidationErrors([
  body("title").notEmpty().withMessage("please pick a title"),
  body("start").notEmpty().withMessage("please choose a date"),
  body("start_time")
    .notEmpty()
    .withMessage("please choose a the starting time"),
  body("end").notEmpty().withMessage("please choose a date"),
  body("end_time").notEmpty().withMessage("please choose a the ending time"),
]);

//View Subgroups
export const createSubgroups = withValidationErrors([
  body("subgroupName")
    .notEmpty()
    .withMessage("please provide a sub group name"),
]);
// Member Subgroups
export const checkMember = withValidationErrors([
  param("memberId")
    .notEmpty()
    .withMessage("please pick a member")
    .custom(async (value) => {
      const member = mongoose.Types.ObjectId.isValid(value);
      if (!member) throw new BadRequestError("this id is not valid");
    }),
  param("subgroupId")
    .notEmpty()
    .withMessage("please select a group")
    .custom(async (value, { req }) => {
      const group = mongoose.Types.ObjectId.isValid(value);
      if (!group) throw new BadRequestError("Mongo Id is not valid!");
      const subgroup = await Subgroup.findById(value);
      if (subgroup.joinedBy.includes(req.params.memberId)) {
        throw new UnauthorizedError("this player already joined this subgroup");
      }
    }),
]);

//Update Submember

export const teamLeaderValidation = withValidationErrors([
  body("memberId").custom(async (memberId, { req }) => {
    const member = mongoose.Types.ObjectId.isValid(memberId);
    if (!member) throw new BadRequestError("Mongo Id is not valid!");
    const subGroup = await Subgroup.findById(req.body.groupId);
    if (!subGroup) throw new BadRequestError("group does not exist!");
    const isMember = await Member.findById(req.body.memberId);
    if (isMember.permission.role === "president")
      throw new BadRequestError("president cant be team leader!");
    if (isMember.permission.role === "team leader")
      throw new BadRequestError("you can only have one team leader per group!");
  }),
]);

//Contact Validation
export const contactValidation = withValidationErrors([
  body("greeting").notEmpty().withMessage("please make a greeting"),
  body("desc").notEmpty().withMessage("please send a message!"),
]);
//Promotion Validation
export const promotionValidation = withValidationErrors([
  param("groupId").custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new UnauthorizedError("this is not a valid id");
  }),
  param("memberId").custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new UnauthorizedError("this is not a valid id");
  }),
]);
