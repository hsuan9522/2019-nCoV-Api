# 2019-nCoV-Api
Created with CodeSandbox
將csv檔案轉為json格式，來源為 [Covid-19](https://github.com/CSSEGISandData/COVID-19)

### 各國每日累積總數

API URL: [https://w5q6k.sse.codesandbox.io/api/v1/cumulative](https://w5q6k.sse.codesandbox.io/api/v1/cumulative)

資料格式：
```json
[
  {
    "Province/State": "",
    "Country/Region": "Afghanistan",
    "Lat": "33",
    "Long": "65",
    "1/22/20": "0",
    "1/23/20": "0",
    "1/24/20": "0",
    "1/25/20": "0",
    "1/26/20": "0",
    "1/27/20": "0",
    "1/28/20": "1",
    "1/29/20": "1"
  },
  {
    "Province/State": "",
    "Country/Region": "Albania",
    "Lat": "33",
    "Long": "65",
    "1/22/20": "0",
    "1/23/20": "0",
    "1/24/20": "0",
    "1/25/20": "0",
    "1/26/20": "1",
    "1/27/20": "1",
    "1/28/20": "2",
    "1/29/20": "2"
  },
]
```

### 各國各項人數

API URL: [https://w5q6k.sse.codesandbox.io/api/v1/cumulative](https://w5q6k.sse.codesandbox.io/api/v1/all)

資料格式：
```json
[
  {
    "Province/State": "",
    "Country/Region": "Afghanistan",
    "Lat": "33",
    "Long": "65",
    "Confirmed": "100",
    "Recovered": "100",
    "Deaths": "10"
  },
  {
    "Province/State": "",
    "Country/Region": "Albania",
    "Lat": "33",
    "Long": "65",
    "Confirmed": "200",
    "Recovered": "100",
    "Deaths": "10"
  }
]
```
