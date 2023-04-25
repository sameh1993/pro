const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { sendMail } = require("../nodemailer");

router.get("/", (req, res) => {
  res.render("contactus", {
    lang: req.session.lang,
    namePage: "contact us",
    title: req.session.lang === "eng" ? "home Page" : "Dienstleistungen",
    isAdmin: true,
  });
});

router.post(
  "/message",
  check("username").notEmpty().withMessage("this field is required"),
  check("email")
    .notEmpty()
    .withMessage("this field is required")
    .isEmail()
    .withMessage("pls enter a valid email"),
  check("message").notEmpty().withMessage("this field is required"),
  async (req, res) => {
    const data = req.body;

    if (validationResult(req).isEmpty()) {
      sendMail(data)
        .then((result) => {
          res.json({ msg: "message id sent . successfully" });
        })
        .catch((err) => {
          res.json({ err: err });
        });
    } else {
      res.json({ formError: validationResult(req).array() });
    }
  }
);

module.exports = router;
