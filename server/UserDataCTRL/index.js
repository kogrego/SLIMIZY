'use strict';
var userDataSchema = require('../user_schema'),
	userLoginSchema = require('../users_schema'),
    CaloriesAddedEngine = require('../CaloriesGainedEngine'),
    CaloriesBurntEngine = require('../CaloriesBurnEngine'),
    activities = require('../activity_schema'),
    addRoutineToDailyGraph = (routine, graph) => {
        var d = new Date();
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var weekDay = weekday[d.getDay()];
        var today = new Date(new Date().toISOString().substring(0, 9)),
            dailyGraph;
        routine.forEach((entry) => {
            if(weekDay == routine.dayOfWeek){
                dailyGraph  = new dailyGraph({
                    date: today,
                    time: entry.hour,
                    calories: -entry.burntCalories
                });
                graph.push(dailyGraph);
            }
        });
    };

exports.getUserByUsername = (req, res) => {
	var status = null,
        jsonData = null,
        query = userDataSchema.findOne({username:req.params.username});
  	query.exec((err, data) => {
		if (err) {
            status = 400;
            jsonData = {'error': err};
        }
        else {
            status = 200;
            jsonData = data;
        }
        res.status(status).json(jsonData);
	});
};

exports.updateUserBMI = (req, res) => {
	var status = null,
        jsonData = null,
        query = userDataSchema.findOne({username:req.params.username}),
        BMI =
		{
			gender: req.body.gender,
			weight: req.body.weight,
			height: req.body.height,
			BMIScore: req.body.weight / (Math.pow(req.body.height /  100, 2))
		};
  	query.exec((err, data) => {
		if (err){
            status = 400;
            jsonData = {'error': err};
            res.status(status).json(jsonData);
        }
        else{
            data.BMI.gender = BMI.gender;
            data.BMI.weight = BMI.weight;
            data.BMI.height = BMI.height;
            data.BMI.BMIScore = BMI.BMIScore;
            data.save((err) => {
                if (err){
                    status = 400;
                    jsonData = {'error': err};
                }
                else{
                    status = 200;
                    jsonData = {"result":"BMI for user " + data.fullName + " was updated"};
                }
                res.status(status).json(jsonData);
            });
        }
	});	
};

exports.addCalories = (req, res) => {
    var status = null,
        jsonData = null,
        addedCalories = 0,
        date,
        query = userDataSchema.findOne({username:req.params.username}),
        dailyGraph;
    query.exec((err, data) => {
        if (err) {
            status = 400;
            jsonData = {'error': err};
            res.status(status).json(jsonData);
        }
        else {
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    addedCalories += CaloriesAddedEngine.getCaloriesFromFood(req.body[key].food, req.body[key].amount);
                }
            }
            if (addedCalories > 0) {
                date = new Date().toISOString().substring(0, 19).split('T');
                dailyGraph = {
                    date: date[0],
                    time: date[1],
                    calories: addedCalories
                };
                data.dailyGraph.push(dailyGraph);
                data.save((err) => {
                    if (err) {
                        status = 400;
                        jsonData = {'error': err};
                    }
                    else {
                        status = 200;
                        jsonData = {"result": "Daily graph for user " + data.fullName + " was updated: \n" + dailyGraph.toString()};
                    }
                    res.status(status).json(jsonData);
                });
            }
        }
    });
};

exports.removeCalories = (req, res) => {
    var status = null,
        jsonData = null,
        routine,
        once = req.body.once,
        burntCalories,
        date,
        user,
        dailyGraph,
        query = userDataSchema.findOne({username:req.params.username});
    query.exec((err, data) => {
        if (err) {
            status = 400;
            jsonData = {'error': err};
            res.status(status).json(jsonData);
        }
        else {
            routine = {
                exType: req.body.exType,
                dayOfWeek: req.body.dayOfWeek,
                hour: req.body.hour,
                duration: req.body.duration,
                burntCalories: 0
            };
            user = data;
            var query = activities.findOne({name: routine.exType});
            query.exec((err, data) =>{
                if (err) {
                    status = 400;
                    jsonData = {'error': err};
                    res.status(status).json(jsonData);
                }
                else{
                    routine.burntCalories = CaloriesBurntEngine.convertExerciseToCalories(user, routine, data.MET);
                    console.log("routine.burntCalories: "+routine.burntCalories);
                    burntCalories = -routine.burntCalories;
                    console.log("burntCalories: "+burntCalories);
                    date = new Date().toISOString().substring(0, 19).split('T');
                    dailyGraph = {
                        date: date[0],
                        time: date[1],
                        calories: burntCalories
                    };
                    user.dailyGraph.push(dailyGraph);
                    user.save((err) => {
                        if (err) {
                            status = 400;
                            jsonData = {'error': err};
                            res.status(status).json(jsonData);
                        }
                        else if (!once) {
                            user.trainingRoutine.push(routine);
                            user.save((err) => {
                                if (err) {
                                    status = 400;
                                    jsonData = {'error': err};
                                }
                                else {
                                    status = 200;
                                    jsonData = {"result": "Daily graph and routine for user " + user.fullName + " was updated"};
                                }
                                res.status(status).json(jsonData);
                            });
                        }
                        else {
                            status = 200;
                            jsonData = {"result": "Daily graph for user " + user.fullName + " was updated"};
                            res.status(status).json(jsonData);
                        }
                    });
                }
            });
        }
    });
};

exports.getDailyGraph = (req, res) => {
    var status = null,
        jsonData = null,
        query = userDataSchema.findOne({username:req.params.username});
    query.exec((err, data) => {
        if (err) {
            status = 400;
            jsonData = {'error': err};
            res.status(status).json(jsonData);
        }
        else {
            addRoutineToDailyGraph(data.trainingRoutine, data.dailyGraph);
            data.save((err) => {
                if (err) {
                    status = 400;
                    jsonData = {'error': err};
                }
                else {
                    status = 200;
                    jsonData = data.dailyGraph;
                }
                res.status(status).json(jsonData);
            });
        }
    });
};

exports.deleteUser = (req, res) => {
    var status = null,
        jsonData = null,
        query = userDataSchema.findOne({username:req.params.username}).remove();
    query.exec((err) => {
        if (err){
            status = 400;
            jsonData = {'error': err};
            res.status(status).json(jsonData);
        }
        else{
            query = userLoginSchema.findOne({username:req.params.username}).remove();
            query.exec((err) => {
                if (err){
                    status = 400;
                    jsonData = {'error': err};
                }
                else{
                    status = 200;
                    jsonData = {"result":"user deleted"};
                }
                res.status(status).json(jsonData);
            });
        }
    });
};