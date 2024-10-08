import { Router } from "express";
import {
  getCurrentMember,
  getAllMembers,
  createHeadline,
  viewHeadline,
  deleteHeadlines,
  createSchedule,
  getSchedule,
  deleteDates,
  createSubgroup,
  deleteSubgroup,
  processMember,
  viewCreatedSubGroups,
  viewTeamLeaderGroup,
  allGroups,
  teamLeader,
  removeMember,
  createTreasurer,
  createPresident,
  createVicePresident,
  createAssociate,
  updateLink,
  viewAllLinks,
  deleteInvestmentGroup,
  deleteSelf,
} from "../../Controllers/UserGroup/userGroup.js";
import {
  createHeadlineValidate,
  deleteHeadlineValidate,
  createScheduleValidate,
  createSubgroups,
  checkMember,
  teamLeaderValidation,
  promotionValidation,
} from "../../Middleware/Validators/userGroupValidation.js";
const router = Router();

/*
===============
Members
===============
*/
router.route("/get-member/:groupId").get(getCurrentMember);
router.route("/get-all-members/:groupId").get(getAllMembers);

/*
===============
Headline
===============
*/
router
  .route("/create-headline/:groupId")
  .post(createHeadlineValidate, createHeadline);
router.route("/view-headline/:groupId").get(viewHeadline);
router
  .route("/delete-headlines/:id")
  .delete(deleteHeadlineValidate, deleteHeadlines);

/*
===============
Schedule
===============
*/
router
  .route("/create-schedule/:groupId")
  .post(createScheduleValidate, createSchedule);
router.route("/get-schedule/:groupId").get(getSchedule);
router.route("/delete-date/:id").delete(deleteDates);
/*
===============
Subgroup
===============
*/
router.route("/create-subgroup/:groupId").post(createSubgroups, createSubgroup);
router.route("/view-created-subgroups").get(viewCreatedSubGroups);
router.route("/view-teamleader-group").get(viewTeamLeaderGroup);
router
  .route("/process-member/:memberId/:subgroupId")
  .patch(checkMember, processMember);
router.route("/update-teamleader").patch(teamLeaderValidation, teamLeader);
router.route("/remove-member").patch(removeMember);
router.route("/all-groups/:groupId").get(allGroups);
router.route("/delete-subgroup/:id").delete(deleteSubgroup);

/*
  ===============
  Promotion
  ===============
  */
router
  .route("/create-president/:groupId/:memberId")
  .patch(promotionValidation, createPresident);
router
  .route("/create-vicepresident/:groupId/:memberId")
  .patch(promotionValidation, createVicePresident);
router
  .route("/create-treasurer/:groupId/:memberId")
  .patch(promotionValidation, createTreasurer);
router
  .route("/create-associate/:groupId/:memberId")
  .patch(promotionValidation, createAssociate);

/*
  ===============
  Link
  ===============
  */
router.route("/update-link/:subgroupId").patch(updateLink);
router.route("/view-all-links/:groupId").get(viewAllLinks);

/*
  =======================
  Delete Investment Group
  =======================
  */

router.route("/delete-group/:groupId").delete(deleteInvestmentGroup);
router.route("/leave-group/:groupId").delete(deleteSelf);

export default router;
