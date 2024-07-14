const axios = require("axios");
const { response } = require("express");
const humster = async (token) => {
  try {
    let data = {
      count: 10000,
      availableTaps: 12500,
      timestamp: Date.now(),
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,

      url: "https://api.hamsterkombatgame.io/clicker/tap",
      // headers: {
      //   Authorization: "Bearer " + token,
      //   Host: "api.hamsterkombatgamegame.io",
      //   Accept: "application/json",
      //   "Sec-Fetch-Site": "same-site",
      //   "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
      //   "Sec-Fetch-Mode": "cors",
      //   Origin: "https://hamsterkombatgame.io",
      //   "User-Agent":
      //     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      //   Referer: "https://hamsterkombatgame.io",
      //   Connection: "keep-alive",
      //   "Sec-Fetch-Dest": "empty",
      //   "Content-Type": "application/json",
      // },
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9,uz;q=0.8",
        authorization: "Bearer " + token,
        "content-type": "application/json",
        origin: "https://hamsterkombatgame.io",
        priority: "u=1, i",
        referer: "https://hamsterkombatgame.io/",
        "sec-ch-ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
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
    console.log(error.message);
    // getCoin();
  }
};

const hamsterSync = async (token) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hamsterkombatgame.io/clicker/sync",
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
      url: "https://api.hamsterkombatgame.io/clicker/buy-boost",
      headers: {
        Host: "api.hamsterkombatgame.io",
        Accept: "application/json",
        "Sec-Fetch-Site": "same-site",
        "Accept-Language": "uz,en-GB;q=0.9,en;q=0.8",
        "Sec-Fetch-Mode": "cors",
        Origin: "https://hamsterkombatgame.io",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Referer: "https://hamsterkombatgame.io/",
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

const dailybonus = async (token, taskId) => {
  try {
    const config = {
      url: "https://api.hamsterkombatgame.io/clicker/check-task",
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
        Referer: "https://hamsterkombatgame.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "POST",
      data: {
        taskId: taskId,
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

const maxfiyKod = async (token, kod) => {
  const config = {
    url: "https://api.hamsterkombatgame.io/clicker/claim-daily-cipher",
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9,uz;q=0.8",
      authorization: "Bearer " + token,
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://hamsterkombatgame.io/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    method: "POST",
    data: {
      cipher: kod,
    },
  };
  try {
    const response = await axios(config);
    if (response.status == 200 || response.status == 201) {
      const { clickerUser, dailyCipher } = response.data;
      const data = {
        userId: clickerUser.id,
        ...dailyCipher,
      };
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};

const listTask = async (token) => {
  const config = {
    url: "https://api.hamsterkombatgame.io/clicker/list-tasks",
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    },
  };
  try {
    const response = await axios(config);
    if (response.status == 200 || response.status == 201) {
      const { tasks } = response.data;
      let notComplated = tasks.filter((el) => el.isCompleted == false);
      const returned = notComplated.map(async (el) => {
        return await dailybonus(token, el.id);
      });

      return await Promise.all(returned);
      // return tasks;
    }
  } catch (error) {
    return error.response.data;
  }
};

module.exports = {
  humster,
  hamsterSync,
  hamsterFullEnergy,
  dailybonus,
  maxfiyKod,
  listTask,
};
// getCoin().then((data) => console.log(data));
// getCoin().then((data) => console.log(data));

// const interval = setInterval(async () => {
//   try {
//     console.log(await getCoin());
//   } catch (error) {
//     console.log(await getCoin());
//   }
// }, 10000);
