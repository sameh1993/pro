const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("news", {
    lang: req.session.lang,
    namePage: "news",
    title: req.session.lang === "eng" ? "news Page" : "Dienstleistungen",
    isAdmin: true,
  });
});

module.exports = router;
