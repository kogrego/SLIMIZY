var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
	id: String,
	username: {type: String, unique:true},
	password: {type: String, stringTransform: function(string) {
    if(!passwordHash.isHashed(string)) {
      string = passwordHash.generate(string);
    }
    return string;
  }}
}, {collection: 'userLogin'});

var user = mongoose.model('userLogin', userSchema);
console.log('db Connected!');
module.exports = user;
