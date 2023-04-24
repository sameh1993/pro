const router = require("express").Router();
const { check } = require("express-validator");
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
  check("terms").notEmpty().withMessage("the fleid is required"),
  async (req, res) => {
    const data = req.body;
    console.log(data);
    sendMail(data)
      .then((result) => {
        res.json({ msg: "message id sent . successfully" });
      })
      .catch((err) => {
        res.json({ err: err });
      });
  }
);

module.exports = router;
