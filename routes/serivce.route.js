const router = require("express")();
const connect = require("../models/conn").connect;
const project = require("../models/project.model");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/serivces");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// get all serivces
router.get("/", async (req, res) => {
  await connect();
  const serivces = await project.find(
    { lang: req.session.lang },
    { serivces: 1, lang: 1 }
  );
  res.render("our-serivces", {
    title: "our serivces",
    namePage: req.session.lang === "eng" ? "serivces" : "Dienstleistungen",
    title: req.session.lang === "eng" ? "serivces" : "Dienstleistungen",
    lang: req.session.lang,
    isAdmin: true,
    serivces: serivces,
    addValidatorError: req.flash("validatorError"),
    addCategoryError: req.flash("validatorError2"),
  });
});

// add serivce
router.post(
  "/add",
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "assets/images/serivces");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  check("serivceName").notEmpty().withMessage("this field is required"),
  check("categoryItems").notEmpty().withMessage("this field is required"),
  check("image").custom((value, { req }) => {
    if (req.file) return true;
    else throw "the image is required";
  }),
  async (req, res) => {
    // return console.log(req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("validatorError", validationResult(req).array());
      res.redirect("/serivces");
    } else {
      const data = req.body;
      // return console.log(data);
      const ourData = {
        serivceName: data.serivceName,
        img: req.file.filename,
        desc: [
          {
            title: data.categoryName,
            body: data.categoryItems,
          },
        ],
      };

      // return console.log(ourData);
      await connect();
      const addSerivces = await project.updateOne(
        { lang: req.session.lang },
        { $push: { serivces: ourData } }
      );
      res.redirect("/serivces");
    }
  }
);

// add category into exsting serivces
router.get(
  "/add-category",
  check("serivcesId").notEmpty().withMessage("this field is required"),
  check("serName").notEmpty().withMessage("this field is required"),
  check("categoryItems").notEmpty().withMessage("this field is required"),
  async (req, res) => {
    // return console.log(req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("validatorError2", validationResult(req).array());
      res.redirect("/serivces");
    } else {
      const ourData = req.query;
      // return console.log(ourData);

      await connect();
      const updateData = await project.updateOne(
        {
          lang: req.session.lang,
          "serivces._id": ObjectId(ourData.serivcesId),
        },
        {
          $push: {
            "serivces.$.desc": {
              title: ourData.serName,
              body: ourData.categoryItems,
            },
          },
        }
      );
      if (updateData.matchedCount > 0) {
        res.redirect("/serivces");
      }
    }
  }
);

const fs = require("fs");
const { ObjectId } = require("mongodb");
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  // return console.log(req.query);
  console.log(id, "id");
  await connect();
  const isDelete = await project.updateOne(
    { lang: req.session.lang },
    { $pull: { serivces: { _id: id } } }
  );
  console.log(req.query.img, "img");
  console.log(isDelete.modifiedCount);
  if (isDelete.modifiedCount > 0) {
    fs.unlink(`../assets/images/serivces/${req.query.img}`, (err) => {
      res.redirect("/serivces");
    });
  }
});

module.exports = router;
