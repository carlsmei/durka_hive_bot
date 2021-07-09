const config = require('config');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(config.token);

module.exports = bot;

bot.launch();
