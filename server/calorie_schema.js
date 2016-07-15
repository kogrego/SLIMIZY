var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    calorieSchema,
    CalorieSchema;

CalorieSchema = new schema({
    name: String,
    calories: Number
}, {collection: 'calories'});

calorieSchema = mongoose.model('calorieSchema', CalorieSchema);

module.exports = calorieSchema;