const axios = require("axios");
const pixel = async () => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-clicker.pixelverse.xyz/api/mining/claim",
      headers: {
        // accept: "application/json, text/plain, */*",
        // "accept-language": "en-US,en;q=0.9,uz;q=0.8",
        // "content-length": "0",
        initdata:
          "query_id=AAF6AGw2AAAAAHoAbDZLwnaR&user=%7B%22id%22%3A913047674%2C%22first_name%22%3A%22Hayotbek%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22hayotbek_0427%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1718519522&hash=5bc54947a74058256801b51a7cf8f3718da2ee73d4fe2a1f29747dc329d8c66f",
        origin: "https://sexyzbot.pxlvrs.io",
        priority: "u=1, i",
        referer: "https://sexyzbot.pxlvrs.io/",
        // "sec-ch-ua":
        //   '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        // "sec-ch-ua-mobile": "?0",
        // "sec-ch-ua-platform": '"Windows"',
        // "sec-fetch-dest": "empty",
        // "sec-fetch-mode": "cors",
        // "sec-fetch-site": "cross-site",
        secret:
          "8ea29e6f3f0c15c600e4760ab701ee8a660a5b48f101fd0ab706dd8985f7576f",
        "tg-id": "913047674",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        username: "hayotbek_0427",
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
module.exports = pixel;
