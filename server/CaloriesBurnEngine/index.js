"use strict";

exports.convertExerciseToCalories = (user, trainingRoutine, MET) => {

    var BMR = null,                     //Basal Metabolic Rate (over 24 hours)
    //  MET                             //Metabolic Equivalent (for selected activity)
        T = trainingRoutine.duration,   //Activity duration time (in hours)
        HC = user.BMI.height,           //(in centimetres)
        WKG = user.BMI.weight,          //(in kilograms)
        age = user.age;

    if(user == null || trainingRoutine == null){
        return "ERROR";
    }

    if (user.BMI.gender == "male") {
        BMR = (13.75 * WKG) + (5 * HC) - (6.76 * age) + 66;
    }
    else {
        BMR = (9.56 * WKG) + (1.85 * HC) - (4.68 * age) + 655;
    }
    return parseInt((BMR / 24) * MET * T);
};