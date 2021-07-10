const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	id: {type: Number, required: true},
	data: {type: Object, default: {}}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: 'users'
});

UserSchema.methods.set_data = function(id, value) {
	this.data[id] = value;

	this.save();
};

UserSchema.methods.get_data = function(id, default_value) {
	if (this.data[id]) {
		return this.data[id];
	}
	else if (default_value) {
		return default_value;
	};
};

module.exports = mongoose.model('User', UserSchema);
