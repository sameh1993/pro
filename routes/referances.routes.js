const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("referances", {
    lang: req.session.lang,
    namePage: "referances",
    title: req.session.lang === "eng" ? "referances Page" : "Dienstleistungen",
    isAdmin: true,
  });
});

module.exports = router;
