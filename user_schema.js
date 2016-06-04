var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userDataSchema;

var trainingRoutine_schema = new schema{
	exType: String,
	dayOfWeek: String,
	beginTime: Date,
	duration: Number,
	burntCalories: Number
}	

var BMI_schema = new schema{
	gender: String,
	weight: Number,
	height: Number,
	BMIScore: Number
}

var userData = new schema({
	id: Number,
	fullName: String,
	age: Number,
	trainingRoutine: [trainingRoutine_schema],
	BMI: BMI_schema
}, {collection: 'userData'});

userDataSchema = mongoose.model('userDataSchema', userData);

module.exports = userSchema;
