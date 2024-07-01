require("dotenv").config();
const {
  humster,
  hamsterSync,
  hamsterFullEnergy,
  dailybonus,
  maxfiyKod,
  listTask,
} = require("./humster");
const pixel = require("./pixel");
const os = require("os");
const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
// const axios = require("axios");
const accounts = require("./accounts.json");
const express = require("express");
const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();
app.use(express.json());

// webhook
app.post("/webhook", async (req, res) => {
  bot.handleUpdate(req.body, res);
});

const url = process.env.RENDER_EXTERNAL_URL || process.env.WEBHOOK;
bot.telegram.setWebhook(url + "/webhook");

app.get("/", async (req, res) => {
  const account_list = accounts.map(async (el) => await humster(el.token));

  const result = await Promise.all([
    ...account_list,
    // humster(process.env.TOKEN_HAYOTBEK),
    // humster(process.env.TOKEN_NODIRA),
    // humster(process.env.TOKEN_SAMANDAR),
    // humster(process.env.TOKEN_THAILAND),
    // humster(process.env.TOKEN_HAYOTBEK_OLD),
    // humster(process.env.TOKEN_JAVOHIR),
    // humster(process.env.TOKEN_AKOBIR),
    // humster(process.env.TOKEN_AKOBIR_MOTHER),
    // humster(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    // humster(process.env.TOKEN_ISLOM),
    // humster(process.env.TOKEN),
    // humster(process.env.TOKEN_NARGIZA),

    pixel(),
  ]);
  res.writeHead(200, "ok", { "Content-Type": "application/json" });
  return res.end(JSON.stringify(result, null, 2));
});

//every one hour
app.get("/sync", async (_, res) => {
  const account_list = accounts.map(async (el) => await hamsterSync(el.token));

  const result = await Promise.all(account_list);
  return res.json(result);
});

// app.get("/task", async (req, res) => {
// const result = await Promise.all([listTask(process.env.TOKEN_NARGIZA)]);
//   return res.json(result);
// });

//every one hour
app.get("/fullenergy", async (_, res) => {
  const account_list = accounts.map(
    async (el) => await hamsterFullEnergy(el.token)
  );

  const result = await Promise.all(account_list);
  return res.json(result);
});
// app.get('/')

//every  day
app.get("/dailybonus", async (_, res) => {
  const account_list = accounts.map(async (el) => await listTask(el.token));
  const result = await Promise.all(account_list);
  return res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

bot.use((ctx, next) => {
  if (ctx.message.from.id == process.env.CHAT_ID) {
    return next();
  } else {
    return ctx.reply("You are not allowed to use this bot");
  }
});

bot.start((ctx) => ctx.reply("Hamster maxfiy kodini kiriting..."));

bot.on("message", async (ctx) => {
  const loading = await ctx.reply("⏳");
  const account_list = accounts.map(
    async (el) => await maxfiyKod(el.token, ctx.message.text.toUpperCase())
  );
  const data = await Promise.all(account_list);

  // const data = await maxfiyKod(process.env.TOKEN_ISLOM, ctx.message.text);
  // console.log(loading.message_id)
  ctx.deleteMessage(loading.message_id);
  ctx.reply(`${"```" + JSON.stringify(data, null, 2) + "```"}`, {
    parse_mode: "MarkdownV2",
  });
});
