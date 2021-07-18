const bot = require('@bot');
const { Keyboard, Key } = require('telegram-keyboard');

bot.action('license_accept', (ctx) => {
	if (!ctx.user.license) {
		ctx.reply(t('license.accept'));
		
		ctx.user.license = true
		ctx.user.save();
	}
})

bot.use((ctx, next) => {
	if (!ctx.user.license) {
		ctx.replyWithHTML(t('license.text'), Keyboard.make([Key.callback(t('action.license.accept'), 'license_accept')]).inline());

		return;
	}
	
	next();
});
