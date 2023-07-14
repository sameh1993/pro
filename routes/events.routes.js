const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("events", {
    lang: req.session.lang,
    namePage: "events",
    title: req.session.lang === "eng" ? "events Page" : "Dienstleistungen",
    isAdmin: true,
  });
});

module.exports = router;
