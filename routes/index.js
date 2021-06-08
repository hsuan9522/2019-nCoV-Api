const express = require("express");
const request = require("request");
const rp = require("request-promise");

var router = express.Router();
//原本是註解掉的那種寫法，不過後來不知道為什麼getAll出現了問題，所以現在只好把他們變成只有單存一隻getAll不在分種類。
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

const getCumulative = async (req, res, next) => {
	try {
		request.get(
			"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
			function (error, response, body) {
				if (!error && response.statusCode === 200) {
					let data = body;
					data = data.split("\n");
					let col = data.shift().replace(/\r/g, "").split(",");
					let jsonObj = [];
					data.forEach((el) => {
						let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
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
	return rp(
		"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
	).then((response) => {
		let data = response;
		data = data.split("\n");
		let col = data.shift().replace(/\r/g, "").split(",");
		let jsonObj = [];
		data.forEach((el) => {
			let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
			let tmpE = {};
			tmpEl.forEach((e, index) => {
				if (index <= 3) tmpE[col[index]] = e;
				if (index === tmpEl.length - 1) tmpE["Confirmed"] = e;
			});
			let tmp_index = jsonObj.findIndex(
				(el) => el["Country/Region"] === tmpE["Country/Region"]
			);
			if (tmp_index !== -1) {
				let a = parseInt(jsonObj[tmp_index]["Confirmed"], 10);
				let b = parseInt(tmpE["Confirmed"], 10);
				jsonObj[tmp_index]["Confirmed"] = a + b;
			} else {
				jsonObj.push(tmpE);
			}
		});
		// res.json(jsonObj);
		return jsonObj;
	});
	// try {
	//   request.get(
	//     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
	//     function (error, response, body) {
	//       if (!error && response.statusCode === 200) {
	//         let data = body;
	//         data = data.split("\n");
	//         let col = data.shift().replace(/\r/g, "").split(",");
	//         let jsonObj = [];
	//         data.forEach((el) => {
	//           let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
	//           let tmpE = {};
	//           tmpEl.forEach((e, index) => {
	//             if (index <= 3) tmpE[col[index]] = e;
	//             if (index === tmpEl.length - 1) tmpE["Confirmed"] = e;
	//           });
	//           let tmp_index = jsonObj.findIndex(
	//             (el) => el["Country/Region"] === tmpE["Country/Region"]
	//           );
	//           if (tmp_index !== -1) {
	//             let a = parseInt(jsonObj[tmp_index]["Confirmed"], 10);
	//             let b = parseInt(tmpE["Confirmed"], 10);
	//             jsonObj[tmp_index]["Confirmed"] = a + b;
	//           } else {
	//             jsonObj.push(tmpE);
	//           }
	//         });
	//         res.json(jsonObj);
	//       }
	//     }
	//   );
	// } catch (e) {
	//   next(e);
	// }
};

const getDeath = async (req, res, next) => {
	return rp(
		"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
	).then((response) => {
		let data = response;
		data = data.split("\n");
		let col = data.shift().replace(/\r/g, "").split(",");
		let jsonObj = [];
		data.forEach((el) => {
			let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
			let tmpE = {};
			tmpEl.forEach((e, index) => {
				if (index <= 3) tmpE[col[index]] = e;
				if (index === tmpEl.length - 1) tmpE["Deaths"] = e;
			});
			let tmp_index = jsonObj.findIndex(
				(el) => el["Country/Region"] === tmpE["Country/Region"]
			);
			if (tmp_index !== -1) {
				let a = parseInt(jsonObj[tmp_index]["Deaths"], 10);
				let b = parseInt(tmpE["Deaths"], 10);
				jsonObj[tmp_index]["Deaths"] = a + b;
			} else {
				jsonObj.push(tmpE);
			}
		});
		// res.json(jsonObj);
		return jsonObj;
	});
	// try {
	//   request.get(
	//     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
	//     function (error, response, body) {
	//       if (!error && response.statusCode === 200) {
	//         let data = body;
	//         data = data.split("\n");
	//         let col = data.shift().replace(/\r/g, "").split(",");
	//         let jsonObj = [];
	//         data.forEach((el) => {
	//           let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
	//           let tmpE = {};
	//           tmpEl.forEach((e, index) => {
	//             if (index <= 3) tmpE[col[index]] = e;
	//             if (index === tmpEl.length - 1) tmpE["Deaths"] = e;
	//           });
	//           let tmp_index = jsonObj.findIndex(
	//             (el) => el["Country/Region"] === tmpE["Country/Region"]
	//           );
	//           if (tmp_index !== -1) {
	//             let a = parseInt(jsonObj[tmp_index]["Deaths"], 10);
	//             let b = parseInt(tmpE["Deaths"], 10);
	//             jsonObj[tmp_index]["Deaths"] = a + b;
	//           } else {
	//             jsonObj.push(tmpE);
	//           }
	//         });
	//         res.json(jsonObj);
	//       }
	//     }
	//   );
	// } catch (e) {
	//   next(e);
	// }
};

const getRecovered = async (req, res, next) => {
	return rp(
		"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
	).then((response) => {
		let data = response;
		data = data.split("\n");
		let col = data.shift().replace(/\r/g, "").split(",");
		let jsonObj = [];
		data.forEach((el) => {
			let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
			let tmpE = {};
			tmpEl.forEach((e, index) => {
				if (index <= 3) tmpE[col[index]] = e;
				if (index === tmpEl.length - 1) tmpE["Recovered"] = e;
			});
			let tmp_index = jsonObj.findIndex(
				(el) => el["Country/Region"] === tmpE["Country/Region"]
			);
			if (tmp_index !== -1) {
				let a = parseInt(jsonObj[tmp_index]["Recovered"], 10);
				let b = parseInt(tmpE["Recovered"], 10);
				jsonObj[tmp_index]["Recovered"] = a + b;
			} else {
				jsonObj.push(tmpE);
			}
		});
		// res.json(jsonObj);
		return jsonObj;
	});
	// try {
	//   request.get(
	//     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",
	//     function (error, response, body) {
	//       if (!error && response.statusCode === 200) {
	//         let data = body;
	//         data = data.split("\n");
	//         let col = data.shift().replace(/\r/g, "").split(",");
	//         let jsonObj = [];
	//         data.forEach((el) => {
	//           let tmpEl = el.replace(/\r/g, "").replace(/(, )/g, " ").split(",");
	//           let tmpE = {};
	//           tmpEl.forEach((e, index) => {
	//             if (index <= 3) tmpE[col[index]] = e;
	//             if (index === tmpEl.length - 1) tmpE["Recovered"] = e;
	//           });
	//           let tmp_index = jsonObj.findIndex(
	//             (el) => el["Country/Region"] === tmpE["Country/Region"]
	//           );
	//           if (tmp_index !== -1) {
	//             let a = parseInt(jsonObj[tmp_index]["Recovered"], 10);
	//             let b = parseInt(tmpE["Recovered"], 10);
	//             jsonObj[tmp_index]["Recovered"] = a + b;
	//           } else {
	//             jsonObj.push(tmpE);
	//           }
	//         });
	//         // res.json(jsonObj);
	//         return jsonObj;
	//       }
	//     }
	//   );
	// } catch (e) {
	//   next(e);
	//   return;
	// }
};

const getAll = async (req, res, next) => {
	try {
		const confirmed = await getConfirmed(req, res, next);
		const recovered = await getRecovered(req, res, next);
		const deaths = await getDeath(req, res, next);
		console.log(deaths);
		let all = recovered;
		deaths.forEach((el) => {
			let tmp_i = all.findIndex(
				(e) => e["Country/Region"] === el["Country/Region"]
			);
			all[tmp_i]["Deaths"] = el["Deaths"];
		});
		confirmed.forEach((el) => {
			let tmp_i = all.findIndex(
				(e) => e["Country/Region"] === el["Country/Region"]
			);
			all[tmp_i]["Confirmed"] = el["Confirmed"];
		});
		all = all.filter((el) => el.Recovered !== "");
		res.json(all);
		console.log(all);
	} catch { }

	// function httpGet(url, callback) {
	//   const options = {
	//     url: url,
	//     json: true
	//   };
	//   request.get(options, function (err, res, body) {
	//     callback(err, body);
	//   });
	// }

	// const urls = [
	//   "https://w5q6k.sse.codesandbox.io/api/v1/recovered",
	//   "https://w5q6k.sse.codesandbox.io/api/v1/deaths",
	//   "https://w5q6k.sse.codesandbox.io/api/v1/confirmed"
	// ];

	// async2.map(urls, httpGet, function (err, res2) {
	//   console.log("!!!", res2);
	//   if (err) return console.log(err);
	//   let all = res2[0];
	//   res2[1].forEach((el) => {
	//     let tmp_i = all.findIndex(
	//       (e) => e["Country/Region"] === el["Country/Region"]
	//     );
	//     all[tmp_i]["Deaths"] = el["Deaths"];
	//   });
	//   res2[2].forEach((el) => {
	//     let tmp_i = all.findIndex(
	//       (e) => e["Country/Region"] === el["Country/Region"]
	//     );
	//     all[tmp_i]["Confirmed"] = el["Confirmed"];
	//   });
	//   all = all.filter((el) => el.Recovered !== "");
	//   res.json(all);
	// });
};

router.route("/api/v1/cumulative").get(getCumulative);
// router.route("/api/v1/confirmed").get(getConfirmed);
// router.route("/api/v1/deaths").get(getDeath);
// router.route("/api/v1/recovered").get(getRecovered);
router.route("/api/v1/all").get(getAll);

module.exports = router;
