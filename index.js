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
// const axios = require("axios");
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

// app.get("/task", async (req, res) => {
// const result = await Promise.all([listTask(process.env.TOKEN_NARGIZA)]);
//   return res.json(result);
// });

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
    listTask(process.env.TOKEN_HAYOTBEK),
    listTask(process.env.TOKEN_NODIRA),
    listTask(process.env.TOKEN_SAMANDAR),
    listTask(process.env.TOKEN_THAILAND),
    listTask(process.env.TOKEN_HAYOTBEK_OLD),
    listTask(process.env.TOKEN_JAVOHIR),
    listTask(process.env.TOKEN_AKOBIR),
    listTask(process.env.TOKEN_AKOBIR_MOTHER),
    listTask(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2),
    listTask(process.env.TOKEN_ISLOM),
    listTask(process.env.TOKEN),
    listTask(process.env.TOKEN_NARGIZA),
  ]);
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

  const data = await Promise.all([
    maxfiyKod(process.env.TOKEN_HAYOTBEK, ctx.message.text),
    maxfiyKod(process.env.TOKEN_NODIRA, ctx.message.text),
    maxfiyKod(process.env.TOKEN_SAMANDAR, ctx.message.text),
    maxfiyKod(process.env.TOKEN_THAILAND, ctx.message.text),
    maxfiyKod(process.env.TOKEN_HAYOTBEK_OLD, ctx.message.text),
    maxfiyKod(process.env.TOKEN_JAVOHIR, ctx.message.text),
    maxfiyKod(process.env.TOKEN_AKOBIR, ctx.message.text),
    maxfiyKod(process.env.TOKEN_AKOBIR_MOTHER, ctx.message.text),
    maxfiyKod(process.env.TOKEN_AKOBIR_MOTHER_PHONE_2, ctx.message.text),
    maxfiyKod(process.env.TOKEN_ISLOM, ctx.message.text),
    maxfiyKod(process.env.TOKEN, ctx.message.text),
    maxfiyKod(process.env.TOKEN_NARGIZA, ctx.message.text),
  ]);

  // const data = await maxfiyKod(process.env.TOKEN_ISLOM, ctx.message.text);
  // console.log(loading.message_id)
  ctx.deleteMessage(loading.message_id);
  ctx.reply(`${"```" + JSON.stringify(data, null, 2) + "```"}`, {
    parse_mode: "MarkdownV2",
  });
});
