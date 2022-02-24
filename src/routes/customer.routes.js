const { Router } = require("express");
const { validateJWT, validateRole } = require("../middlewares/");

const router = Router();
const {
  addCustomer,
  customerGet,
  customersGet,
  customerPut,
  customerDelete,
  customerDisable,
} = require("../controllers/customer.controller");

  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/:id", customerGet);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/", customersGet);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.post("/", addCustomer);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.put("/:id", customerPut);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.delete("/:id", customerDisable);
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.delete("/delete/:id", customerDelete);

module.exports = router;
