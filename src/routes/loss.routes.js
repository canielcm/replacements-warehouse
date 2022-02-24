const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateRole } = require("../middlewares/");

const router = Router();
const {
  makeLoss,
  lossGet,
  lossesGet,
} = require("../controllers/loss.controller");

  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/:id", lossGet);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/", lossesGet);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.post("/", makeLoss);

module.exports = router;
