require("dotenv").config();
const {
  humster,
  hamsterSync,
  hamsterFullEnergy,
  dailybonus,
} = require("./humster");
const pixel = require("./pixel");
const os = require("os");
const { Telegraf } = require("telegraf");
// const axios = require("axios");
const express = require("express");
const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();

app.use(express.json());

//webhook
// app.post("/webhook", async (req, res) => {
//   bot.handleUpdate(req.body, res);
// });
// bot.telegram.setWebhook(process.env.WEBHOOK);

app.get("/env", async (req, res) => {
  return res.json(process.env);
});

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
    humster(process.env.TOKEN),
    humster(process.env.TOKEN_NARGIZA),
    pixel(),
  ]);
  res.writeHead(200, "ok", { "Content-Type": "application/json" });
  return res.end(JSON.stringify(result, null, 2));
});

//every one hour
app.get("/sync", async (_, res) => {
  const result = await Promise.all([
    hamsterSync(process.env.TOKEN_HAYOTBEK),
    hamsterSync(process.env.TOKEN_NODIRA),
    hamsterSync(process.env.TOKEN_SAMANDAR),
    hamsterSync(process.env.TOKEN_THAILAND),
    hamsterSync(process.env.TOKEN_HAYOTBEK_OLD),
    hamsterSync(process.env.TOKEN_JAVOHIR),
    hamsterSync(process.env.TOKEN_AKOBIR),
    hamsterSync(process.env.TOKEN_AKOBIR_MOTHER),
    hamsterSync(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    hamsterSync(process.env.TOKEN_ISLOM),
    hamsterSync(process.env.TOKEN),
    hamsterSync(process.env.TOKEN_NARGIZA),
  ]);
  return res.json(result);
});

//every one hour
app.get("/fullenergy", async (_, res) => {
  const result = await Promise.all([
    hamsterFullEnergy(process.env.TOKEN_HAYOTBEK),
    hamsterFullEnergy(process.env.TOKEN_NODIRA),
    hamsterFullEnergy(process.env.TOKEN_SAMANDAR),
    hamsterFullEnergy(process.env.TOKEN_THAILAND),
    hamsterFullEnergy(process.env.TOKEN_HAYOTBEK_OLD),
    hamsterFullEnergy(process.env.TOKEN_JAVOHIR),
    hamsterFullEnergy(process.env.TOKEN_AKOBIR),
    hamsterFullEnergy(process.env.TOKEN_AKOBIR_MOTHER),
    hamsterFullEnergy(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    hamsterFullEnergy(process.env.TOKEN_ISLOM),
    hamsterFullEnergy(process.env.TOKEN),
    hamsterFullEnergy(process.env.TOKEN_NARGIZA),
  ]);
  return res.json(result);
});
// app.get('/')

//every  day
app.get("/dailybonus", async (_, res) => {
  const result = await Promise.all([
    dailybonus(process.env.TOKEN_HAYOTBEK),
    dailybonus(process.env.TOKEN_NODIRA),
    dailybonus(process.env.TOKEN_SAMANDAR),
    dailybonus(process.env.TOKEN_THAILAND),
    dailybonus(process.env.TOKEN_HAYOTBEK_OLD),
    dailybonus(process.env.TOKEN_JAVOHIR),
    dailybonus(process.env.TOKEN_AKOBIR),
    dailybonus(process.env.TOKEN_AKOBIR_MOTHER),
    dailybonus(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    dailybonus(process.env.TOKEN_ISLOM),
    dailybonus(process.env.TOKEN),
    dailybonus(process.env.TOKEN_NARGIZA),
  ]);
  return res.json(result);
});

app.get("/maxfiysoz", async (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// bot.start((ctx) => ctx.reply("Welcome!"));
// bot.help((ctx) => ctx.reply("Send me a sticker"));
// bot.on("sticker", (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
