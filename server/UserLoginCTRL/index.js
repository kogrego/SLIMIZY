'use strict';

//DB schema:
var users = require('../users_schema'),  
    user = require('../user_schema');      

//MDL function:

exports.login = (req,res) => {
    var path = null,
        username = req.body.username,
        password = req.body.password;
    users.findOne({username: username, password:password}, (err, user) => {
        if (err){
            path = '/login/error'
        }
        else if (!user) {
            path = '/login/usernotfound'
        }
        else{
            var yesDate = new Date();
            yesDate.setDate(yesDate.getDate() - 1);
            var date = yesDate.toISOString().substring(0, 9);
            path = '/user/calories/'+username+'/'+date;
        }
        return res.redirect(path);

    })
};


exports.register = (req, res) => {

    var username = req.body.username,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        fullName = firstName + " " + lastName,
        age = req.body.age,
        weight = req.body.weight,
        height = req.body.height,
        BMIScore = weight / ((height / 100) * (height / 100)),
        gender = req.body.gender,
        path = null;
    users.findOne({username: username}, (err, data) => {
        if (err) {
            path = '/register/error'
        }
        else if (data){
            path = '/register/userexists'
        }
        else{
            var newUser = new users({
                username: username,
                password: password
            });
            newUser.save((err, doc) => {
                if(err){
                    path = '/register/error'
                }
                else{
                    user.findOne({username: username}, (err, data) => {
                        if (err) {
                            path = '/register/error'
                        }
                        else {
                            var newUser = new user({
                                username: username,
                                fullName: fullName,
                                age: 0,
                                trainingRoutine: [],
                                BMI: {
                                    gender: gender,
                                    height: height,
                                    weight: weight,
                                    BMIScore: BMIScore
                                },
                                dailyGraph: []
                            });
                            newUser.save((err, doc) => {
                                if(err) {
                                    path = '/register/error'
                                }
                                else {
                                    var yesDate = new Date();
                                    yesDate.setDate(yesDate.getDate() - 1);
                                    var date = yesDate.toISOString().substring(0, 10);
                                    path = '/user/calories/'+username+'/'+date;
                                }
                                return res.redirect(path);
                            });
                        }
                    });
                }
            });
        }
    });
};