require('module-alias/register');
require('@db');
require('@language');

// bot
const bot = require('@bot');
require('./middlewares');
require('./controllers');
