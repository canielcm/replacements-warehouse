const { Router } = require("express");
const router = Router();
const { validateJWT, validateRole } = require("../middlewares/");


router.get("/ok", (req, res)=>{
    res.status(200).json({
        message: "ALL CORRECT, SERVER IS ON"
    })
});

router.all("*", (req, res) => {
  res.status(404).json({
    message: "Endpoint not Found",
  });
});
module.exports = router;
