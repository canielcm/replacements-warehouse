const validateJWT = require("../middlewares/validateJWT");
const validateRole = require("../middlewares/validateRole");
const validateFields = require("../middlewares/validateFields");

module.exports = {
    ...validateJWT,
    ...validateRole,
    ...validateFields
};