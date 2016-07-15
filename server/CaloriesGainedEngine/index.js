"use strict";
var Calories = require('../calorie_schema');

exports.getCaloriesFromFood = (name, amount) => {
    var query = Calories.findOne({name: food});
    query.exec((err, data) => {
        if (err){
            return "ERROR";
        }
        else{
            return data.calories * amount;
        }
    });
};