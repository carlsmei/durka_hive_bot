const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	id: {type: Number, required: true},
	license: {type: Boolean, default: false, required: true},
	start_touched: {type: Boolean, default: false},
	lang: {type: String, required: true, default: 'ru'}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);
