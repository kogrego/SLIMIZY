var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userLogin;

var userSchema = new mongoose.Schema({
	id: String,
	username: {type: String, unique:true},
	password: {type: String, stringTransform: function(string) {
    if(!passwordHash.isHashed(string)) {
      string = passwordHash.generate(string);
    }
    return string;
  }}
}, {collection: 'userLogin'});

userLogin = mongoose.model('userLogin', userSchema);

module.exports = userLogin;
