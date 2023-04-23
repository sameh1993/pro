const router = require("express").Router();
const { check } = require("express-validator");

router.get("/", (req, res) => {
  res.render("contactus", {
    lang: req.session.lang,
    namePage: "contact us",
    title: "contact us",
  });
});

router.get(
  "/message",
  check("username").notEmpty().withMessage("this field is required"),
  check("email")
    .notEmpty()
    .withMessage("this field is required")
    .isEmail()
    .withMessage("pls enter a valid email"),
  check("message").notEmpty().withMessage("this field is required"),
  check("terms").notEmpty().withMessage("the fleid is required"),
  (req, res) => {
    console.log(req.query);
  }
);

module.exports = router;
