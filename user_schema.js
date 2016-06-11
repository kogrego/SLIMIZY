var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userDataSchema;

var trainingRoutine_schema = new schema({
	exType: String,
	dayOfWeek: String,
	beginTime: Date,
	duration: Number,
	burntCalories: Number
});

var BMI_schema = new schema({
	gender: String,
	weight: Number,
	height: Number,
	BMIScore: Number
}, {collection: 'BMI'});

var dailyGraph_schema = new schema({
	date: Date,
	time: Date,
	calories: Number
});

var userData = new schema({
	id: Number,
	fullName: String,
	age: Number,
	trainingRoutine: [trainingRoutine_schema],
	BMI: BMI_schema,
	dailyGraph: [dailyGraph_schema]
}, {collection: 'userData'});

userDataSchema = mongoose.model('userDataSchema', userData);

module.exports = userDataSchema;
