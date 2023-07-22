const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("news", {
    lang: req.session.lang,
    namePage: "Partners",
    title: req.session.lang === "eng" ? "partners Page" : "Partner",
    isAdmin: true,
  });
});

module.exports = router;
