var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userLoginSchema;

var schema_name = new schema({
	id: String,
	username: String,
	password: String,
}, {collection: 'UserLogin'});

userLoginSchema = mongoose.model('userLoginSchema', schema_name);

module.exports = userLoginSchema;
