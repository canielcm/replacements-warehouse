const { Router } = require("express");
const { check } = require("express-validator");
const { login, getCurrentUser, refreshToken } = require("../controllers/auth.controller");
const { validateFields, validateJWT} = require("../middlewares");
const router = Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  login
);
router.get("/me", validateJWT, getCurrentUser);
router.get('/renew',validateJWT, refreshToken);
module.exports = router;
