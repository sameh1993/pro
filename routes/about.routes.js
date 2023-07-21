const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("about", {
    lang: req.session.lang,
    namePage: "about us",
    title: req.session.lang === "eng" ? "about us Page" : "Dienstleistungen",
    isAdmin: true,
  });
});

module.exports = router;
