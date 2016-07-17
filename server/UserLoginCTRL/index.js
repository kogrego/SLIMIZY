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
            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/login.html?error='+err;
        }
        else if (!user) {
            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/login.html?error=userNotFound';
        }
        else{
            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/index.html?username='+username;
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
            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/register.html?error='+err;
        }
        else if (data){
            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/register.html?error=userExists';
        }
        else{
            var newUser = new users({
                username: username,
                password: password
            });
            newUser.save((err, doc) => {
                if(err){
                    path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/register.html?error='+err;
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
                        if (err) {
                            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/register.html?error='+err;
                        }
                        else {
                            path = 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_184/index.html?username=' + username;
                        }
                        return res.redirect(path);
                    });
                }
            });
        }
        return res.redirect(path);
    });
};