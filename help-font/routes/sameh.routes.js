const router = require("express")();

router.get("/", (req, res, next) => {
  console.log(req.params);
});

router.get("/:id", (req, res, next) => {
  console.log(req.params);
});

module.exports = router;
