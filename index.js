require("dotenv").config();
const humster = require("./humster");
const pixel = require("./pixel");
const os = require("os");
// const axios = require("axios");
const express = require("express");
// const getAuth = async () => {
//   try {
//     let data = JSON.stringify({
//       init_data:
//         "query_id=AAF6AGw2AAAAAHoAbDa_04WQ&user=%7B%22id%22%3A913047674%2C%22first_name%22%3A%22Hayotbek%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22hayotbek_0427%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716122262&hash=20a0e3b91ec1721a4254c19bff85d0218065eb9f2316af1ccffbdeac4d6cbbb1",
//       referrer: "",
//       bot_key: "app_bot_0",
//     });

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://api.tapswap.ai/api/account/login",
//       headers: {
//         Host: "api.tapswap.ai",
//         "x-cv": "1",
//         Accept: "*/*",
//         "Sec-Fetch-Site": "cross-site",
//         "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
//         "Sec-Fetch-Mode": "cors",
//         Origin: "https://app.tapswap.club",
//         "x-app": "tapswap_server",
//         "User-Agent":
//           "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
//         Referer: "https://app.tapswap.club/",
//         Connection: "keep-alive",
//         "Sec-Fetch-Dest": "empty",
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };
//     const response = await axios(config);
//     return response.data.access_token;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Xatolik yuz berdi");
//   }
// };
// const getCoin = async (token = null) => {
//   try {
//     let data = {
//       taps: 5000,
//       time: Date.now(),
//     };
//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://api.tapswap.ai/api/player/submit_taps",
//       headers: {
//         Host: "api.tapswap.ai",
//         "x-cv": "1",
//         Accept: "*/*",
//         Authorization: token
//           ? "Bearer " + token
//           : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkxMzA0NzY3NCwiaWF0IjoxNzE2MTIxNjMwLCJleHAiOjE3MTYxMjUyMzB9.QGuUX6iL5o2vgTrRmtCSluZUDV6cTvVtxDS6HHmObLo",
//         "Content-Id": "912974832",
//         "Sec-Fetch-Site": "cross-site",
//         "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
//         "Sec-Fetch-Mode": "cors",
//         Origin: "https://app.tapswap.club",
//         "User-Agent":
//           "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
//         Referer: "https://app.tapswap.club/",
//         "x-app": "tapswap_server",
//         Connection: "keep-alive",
//         "Sec-Fetch-Dest": "empty",
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     const response = await axios(config);

//     console.log("\n\nSuccess Cleamed");
//     console.log("profile", response?.data?.player?.full_name);
//     console.log("total tabs", response?.data?.player?.shares);
//     // console.log(response.data);
//     return response.data;
//   } catch (error) {
//     if (error?.response?.data?.message == "Unauthorized") {
//       const newToken = await getAuth();
//       if (newToken) {
//         return getCoin(newToken);
//       }
//     }
//     return getCoin();
//     // console.log(error.message);
//   }
// };
// // getCoin();

// const interval = setInterval(() => {
//   try {
//     getCoin();
//   } catch (error) {
//     getCoin();
//   }
// }, 10000);

const app = express();

app.get("/", async (req, res) => {
  const result = await Promise.all([
    humster(process.env.TOKEN_HAYOTBEK),
    humster(process.env.TOKEN_NODIRA),
    humster(process.env.TOKEN_SAMANDAR),
    humster(process.env.TOKEN_THAILAND),
    humster(process.env.TOKEN_HAYOTBEK_OLD),
    humster(process.env.TOKEN_JAVOHIR),
    humster(process.env.TOKEN_AKOBIR),
    humster(process.env.TOKEN_AKOBIR_MOTHER),
    humster(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    humster(process.env.TOKEN_ISLOM),
    pixel(),
  ]);
  res.writeHead(200, "ok", { "Content-Type": "application/json" });
  return res.end(JSON.stringify(result, null, 2));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
