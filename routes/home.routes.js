const express = require("express");
const router = express.Router();
const db = require("../models/conn").connect;
const projects = require("../models/project.model");
const path = require("path");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  console.log(mongoose.connection.readyState, "mongoose");
  req.session.lang ? req.session.lang : "eng";
  const connect = db();
  const sliders = await projects.find(
    { lang: "eng" },
    { sliders: 1, _id: 0, lang: 1 }
  );
  // return console.log(sliders);
  console.log(mongoose.connection.readyState, "mongoose");
  const serivces = await projects.find(
    { lang: req.session.lang },
    { serivces: 1, _id: 0 }
  );

  console.log(serivces);
  res.render("index", {
    lang: req.session.lang,
    namePage: "home",
    title: req.session.lang === "eng" ? "home Page" : "Startseite",
    isAdmin: true,
    sliders: sliders[0],
    serivces: serivces ? serivces : [],
  });
});

router.get("/imprints", (req, res) => {
  if (req.session.lang == "ger") {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "imprints",
        "Creative_Factor_Impressum_Roland_Gropp_ProEntertainment_09_April_2023_GER.pdf"
      )
    );
  } else {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "imprints",
        "Creative_Factor_Impressum_Roland_Gropp_ProEntertainment_09_April_2023_ENG.pdf"
      )
    );
  }
});

router.get("/data-privacy", (req, res) => {
  console.log(req.params);

  if (req.session.lang == "ger") {
    // Creative_Factor_Datenschutzerklaerung_Roland_Gropp_ProEntertainment_10_April_2023_GER.pdf
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "data-privecy",
        "Creative_Factor_Datenschutzerklaerung_Roland_Gropp_ProEntertainment_10_April_2023_GER.pdf"
      )
    );
  } else {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "data-privecy",
        "Creative_Factor_Datenschutzerklaerung_Roland_Gropp_ProEntertainment_10_April_2023_ENG.pdf"
      )
    );
  }
});

module.exports = router;
