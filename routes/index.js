var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const getStats = async (req, res, next) => {
  try {
    const playerStats = {
      x: 1,
      y: 2
    };
    res.json(playerStats);
  } catch (e) {
    next(e);
  }
};
router.route("/api/v1/stats").get(getStats);

module.exports = router;
