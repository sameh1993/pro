const router = require("express").Router();

router.get("/news", () => {
  res.render("index", {
    lang: req.session.lang,
    namePage: "home",
    title: req.session.lang === "eng" ? "news Page" : "Dienstleistungen",
    isAdmin: true,
    sliders: sliders[0].sliders,
    serivces: ourProject ? ourProject : [],
  });
});
