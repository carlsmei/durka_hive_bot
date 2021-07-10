const User = require('@models/user');
const bot = require('@bot');

bot.use(async (ctx, next) => {
	if (!ctx.user) {
		let user = await User.findOne({id: ctx.from.id});

		if (!user) {
			user = new User();

			user.id = ctx.from.id;
			user.data = {};
		}

		ctx.user = user;
	};
	
	next();
});
