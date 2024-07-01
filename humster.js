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
        Authorization: "Bearer " + token,
        Host: "api.hamsterkombat.io",
        Accept: "application/json",
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

const hamsterSync = async (token) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hamsterkombat.io/clicker/sync",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,uz;q=0.8",
        authorization: "Bearer " + token,
        "cache-control": "no-cache",
        pragma: "no-cache",
      },
    };

    const response = await axios(config);
    if (response.status == 200 || response.status == 201) {
      const { boosts, upgrades, tasks, airdropTasks, referral, ...result } =
        response.data?.clickerUser;
      // const result = await response.data?.clickerUser;

      return result;
    }
    // console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const hamsterFullEnergy = async (token) => {
  try {
    const config = {
      url: "https://api.hamsterkombat.io/clicker/buy-boost",
      headers: {
        Host: "api.hamsterkombat.io",
        Accept: "application/json",
        "Sec-Fetch-Site": "same-site",
        "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
        "Sec-Fetch-Mode": "cors",
        Origin: "https://hamsterkombat.io",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Referer: "https://hamsterkombat.io/",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        Authorization: "Bearer " + token,

        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        boostId: "BoostFullAvailableTaps",
        timestamp: Date.now(),
      },
    };
    const response = await axios(config);
    if (response.status == 200 || response.status == 201) {
      const { upgrades, tasks, airdropTasks, referral, ...result } =
        response.data?.clickerUser;
      return result;
    }
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const dailybonus = async (token) => {
  try {
    const config = {
      url: "https://api.hamsterkombat.io/clicker/check-task",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer " + token,
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        Referer: "https://hamsterkombat.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "POST",
      data: {
        taskId: "streak_days",
      },
    };
    const response = await axios(config);
    if (response.status == 200 || response.status == 201) {
      const { task } = response.data;
      return task;
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
    return error.response.data;
  }
};

module.exports = { humster, hamsterSync, hamsterFullEnergy, dailybonus };
// getCoin().then((data) => console.log(data));
// getCoin().then((data) => console.log(data));

// const interval = setInterval(async () => {
//   try {
//     console.log(await getCoin());
//   } catch (error) {
//     console.log(await getCoin());
//   }
// }, 10000);
