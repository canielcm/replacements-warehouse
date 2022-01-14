const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  isAValidRole,
  emailExists,
  userExistsById,
} = require("../helpers/validationDB");
const {
  userGet,
  usersGet,
  userPut,
  userPost,
  userDelete,
  userDisable,
} = require("../controllers/user.controller");
const validateJWT = require("../middlewares/validateJWT");
const validateRole = require("../middlewares/validateRole");

const router = Router();

router.get("/:id", userGet);

router.get("/", usersGet);

router.put(
  "/:id",
  [
    validateJWT,
    validateRole(["ADMIN_ROLE"]),
    check("id", "Not a valid id").isMongoId(),
    check("id", "user doesn't exist").custom(userExistsById),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userPut
);

router.post(
  "/",
  [
    validateJWT,
    validateRole(["ADMIN_ROLE"]),
    check("name", "name is required").not().isEmpty(),
    check(
      "password",
      "password is required and must be longer than 6 letters"
    ).isLength({ min: 6 }),
    check("email", "email not valid").isEmail(),
    //check("role", "Not a allowed role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isAValidRole),
    check("email").custom(emailExists),
    validateFields,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRole(["ADMIN_ROLE"]),
    check("id", "It's not a valid ID").isMongoId(),
    check("id", "User not found").custom(userExistsById),
    validateFields,
  ],
  userDisable
);
router.delete(
  "/delete/:id",
  [
    validateJWT,
    validateRole(["ADMIN_ROLE"]),
    check("id", "It's not a valid ID").isMongoId(),
    check("id", "User not found").custom(userExistsById),
    validateFields,
  ],
  userDelete
);

module.exports = router;
