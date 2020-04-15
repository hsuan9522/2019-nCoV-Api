const express = require("express");
const request = require("request");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const getCumulative = async (req, res, next) => {
  try {
    request.get(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = body;
          data = data.split("\n");
          let col = data.shift().split(",");
          let jsonObj = [];
          data.forEach(el => {
            let tmpEl = el.split(",");
            let tmpE = {};
            tmpEl.forEach((e, index) => {
              tmpE[col[index]] = e;
            });
            jsonObj.push(tmpE);
          });
          res.json(jsonObj);
        }
      }
    );
  } catch (e) {
    next(e);
  }
};

router.route("/api/v1/cumulative").get(getCumulative);

module.exports = router;
