var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userLoginSchema;

var schema_name = new schema({
	id: String,
	username: String,
	password: {type: String, stringTransform: function(string) {
    if(!passwordHash.isHashed(string)) {
      string = passwordHash.generate(string);
    }
    return string;
  }}
}, {collection: 'userLogin'});

userLoginSchema = mongoose.model('userLoginSchema', schema_name);

module.exports = userLoginSchema;
