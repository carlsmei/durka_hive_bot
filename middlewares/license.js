const bot = require('@bot');
const { Keyboard, Key } = require('telegram-keyboard');

bot.action('license_accept', (ctx) => {
	ctx.reply('test')
})

bot.use((ctx, next) => {
	if (!ctx.user.get_data('license')) {
		ctx.replyWithHTML(t('license'), Keyboard.make([Key.callback(t('action.license.accept'), 'license_accept')]).inline());

		return;
	};
	
	next();
});
