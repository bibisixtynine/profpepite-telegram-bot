// bot.js
// v221031 - 1053

import * as dotenv from 'dotenv'
dotenv.config()

import { help } from "./data.js"
import { Clients } from "./Clients.js"

import { Bot } from "grammy";

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');

console.log("");
console.log("##############################################");
console.log("############### BOT RE-STARTED ###############");
console.log("##############################################");
console.log("");

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async ctx => {
  await ctx.reply('🥸')
  await ctx.reply(`Bonjour ${ctx.update.message.from.first_name} ! `)
  await ctx.reply(help)

  bot.api.sendMessage(process.env.TELEGRAM_LOG_ACCOUNT_USER_ID,`💫😍🚀 ${ctx.update.message.from.first_name}, id<${ctx.update.message.from.id}>, vient de faire un </start>`)
})

bot.on('message', ctx => {
  let id = ctx.update.message.from.id
  if (Clients.list[id]) {
    console.log(`${id} is already connected`)
  } else {
    console.log(`new client : id=${id}`)
    Clients.list[id] = new Clients(ctx,bot)
  }
  Clients.findById(id).message(ctx)
})

bot.start();
