const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  makeLoss,
  lossGet,
  lossesGet,
} = require("../controllers/loss.controller");

router.get("/:id", lossGet);
router.get("/", lossesGet);
router.post("/", makeLoss);

module.exports = router;
