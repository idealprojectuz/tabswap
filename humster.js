const axios = require("axios");
const humster = async (token) => {
  try {
    let data = {
      count: 10000,
      availableTaps: 10000,
      timestamp: Date.now(),
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hamsterkombat.io/clicker/tap",
      headers: {
        Host: "api.hamsterkombat.io",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Sec-Fetch-Site": "same-site",
        "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
        "Sec-Fetch-Mode": "cors",
        Origin: "https://hamsterkombat.io",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Referer: "https://hamsterkombat.io/",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    if (response.status == 200) {
      return {
        userId: response.data.clickerUser.id,
        balancedCoins: response.data.clickerUser.balanceCoins,
        level: response.data.clickerUser.level,
        availableTaps: response.data.clickerUser.availableTaps,
      };
    }
  } catch (error) {
    console.log(error);
    // getCoin();
  }
};
module.exports = humster;
// getCoin().then((data) => console.log(data));
// getCoin().then((data) => console.log(data));

// const interval = setInterval(async () => {
//   try {
//     console.log(await getCoin());
//   } catch (error) {
//     console.log(await getCoin());
//   }
// }, 10000);
