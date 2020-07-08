const express = require("express");
const request = require("request");
const async2 = require("async");

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
          let col = data
            .shift()
            .replace(/\r/g, "")
            .split(",");
          let jsonObj = [];
          data.forEach(el => {
            let tmpEl = el
              .replace(/\r/g, "")
              .replace(/(, )/g, " ")
              .split(",");
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

const getConfirmed = async (req, res, next) => {
  try {
    request.get(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = body;
          data = data.split("\n");
          let col = data
            .shift()
            .replace(/\r/g, "")
            .split(",");
          let jsonObj = [];
          data.forEach(el => {
            let tmpEl = el
              .replace(/\r/g, "")
              .replace(/(, )/g, " ")
              .split(",");
            let tmpE = {};
            tmpEl.forEach((e, index) => {
              if (index <= 3) tmpE[col[index]] = e;
              if (index === tmpEl.length - 1) tmpE["Confirmed"] = e;
            });
            let tmp_index = jsonObj.findIndex(
              el => el["Country/Region"] === tmpE["Country/Region"]
            );
            if (tmp_index !== -1) {
              let a = parseInt(jsonObj[tmp_index]["Confirmed"], 10);
              let b = parseInt(tmpE["Confirmed"], 10);
              jsonObj[tmp_index]["Confirmed"] = a + b;
            } else {
              jsonObj.push(tmpE);
            }
          });
          res.json(jsonObj);
        }
      }
    );
  } catch (e) {
    next(e);
  }
};

const getDeath = async (req, res, next) => {
  try {
    request.get(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = body;
          data = data.split("\n");
          let col = data
            .shift()
            .replace(/\r/g, "")
            .split(",");
          let jsonObj = [];
          data.forEach(el => {
            let tmpEl = el
              .replace(/\r/g, "")
              .replace(/(, )/g, " ")
              .split(",");
            let tmpE = {};
            tmpEl.forEach((e, index) => {
              if (index <= 3) tmpE[col[index]] = e;
              if (index === tmpEl.length - 1) tmpE["Deaths"] = e;
            });
            let tmp_index = jsonObj.findIndex(
              el => el["Country/Region"] === tmpE["Country/Region"]
            );
            if (tmp_index !== -1) {
              let a = parseInt(jsonObj[tmp_index]["Deaths"], 10);
              let b = parseInt(tmpE["Deaths"], 10);
              jsonObj[tmp_index]["Deaths"] = a + b;
            } else {
              jsonObj.push(tmpE);
            }
          });
          res.json(jsonObj);
        }
      }
    );
  } catch (e) {
    next(e);
  }
};

const getRecovered = async (req, res, next) => {
  try {
    request.get(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = body;
          data = data.split("\n");
          let col = data
            .shift()
            .replace(/\r/g, "")
            .split(",");
          let jsonObj = [];
          data.forEach(el => {
            let tmpEl = el
              .replace(/\r/g, "")
              .replace(/(, )/g, " ")
              .split(",");
            let tmpE = {};
            tmpEl.forEach((e, index) => {
              if (index <= 3) tmpE[col[index]] = e;
              if (index === tmpEl.length - 1) tmpE["Recovered"] = e;
            });
            let tmp_index = jsonObj.findIndex(
              el => el["Country/Region"] === tmpE["Country/Region"]
            );
            if (tmp_index !== -1) {
              let a = parseInt(jsonObj[tmp_index]["Recovered"], 10);
              let b = parseInt(tmpE["Recovered"], 10);
              jsonObj[tmp_index]["Recovered"] = a + b;
            } else {
              jsonObj.push(tmpE);
            }
          });
          res.json(jsonObj);
        }
      }
    );
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  function httpGet(url, callback) {
    const options = {
      url: url,
      json: true
    };
    request(options, function(err, res, body) {
      callback(err, body);
    });
  }

  const urls = [
    "https://w5q6k.sse.codesandbox.io/api/v1/recovered",
    "https://w5q6k.sse.codesandbox.io/api/v1/deaths",
    "https://w5q6k.sse.codesandbox.io/api/v1/confirmed"
  ];

  async2.map(urls, httpGet, function(err, res2) {
    if (err) return console.log(err);
    let all = res2[0];
    res2[1].forEach(el => {
      let tmp_i = all.findIndex(
        e => e["Country/Region"] === el["Country/Region"]
      );
      all[tmp_i]["Deaths"] = el["Deaths"];
    });
    res2[2].forEach(el => {
      let tmp_i = all.findIndex(
        e => e["Country/Region"] === el["Country/Region"]
      );
      all[tmp_i]["Confirmed"] = el["Confirmed"];
    });
    all = all.filter(el => el.Recovered !== "");
    res.json(all);
  });
};

router.route("/api/v1/cumulative").get(getCumulative);
router.route("/api/v1/confirmed").get(getConfirmed);
router.route("/api/v1/deaths").get(getDeath);
router.route("/api/v1/recovered").get(getRecovered);
router.route("/api/v1/all").get(getAll);

module.exports = router;
