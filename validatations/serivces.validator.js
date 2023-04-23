// const { check, validationResult } = require("express-validator");

// route /serivces/add
exports.getAddNewSerivcesvalidator = [
  check("serivceName").notEmpty().withMessage("this field is required"),
  check("categoryName").notEmpty().withMessage("this field is required"),
  (req, res, next) => {
    if (validationResult(req).isEmpty()) {
      next();
    } else {
      req.flash("validatorError", validationResult(req).array());
    }
  },
];
