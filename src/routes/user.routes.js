const { Router } = require("express");
const { check } = require("express-validator");
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

const { validateJWT, validateRole, validateFields } = require("../middlewares");

const router = Router();

router.get(
  "/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  userGet
);
router.get(
  "/",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  usersGet
);
router.put(
  "/:id",
  [
    validateJWT,
    validateRole("SUPER_ADMIN", "ADMIN_ROLE"),
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
    validateRole("SUPER_ADMIN"),
    check("name", "name is required").not().isEmpty(),
    check(
      "password",
      "password is required and must be longer than 6 letters"
    ).isLength({ min: 6 }),
    check("email", "email not valid").isEmail(),
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
    validateRole("SUPER_ADMIN"),
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
    validateRole("SUPER_ADMIN"),
    check("id", "It's not a valid ID").isMongoId(),
    check("id", "User not found").custom(userExistsById),
    validateFields,
  ],
  userDelete
);

module.exports = router;
