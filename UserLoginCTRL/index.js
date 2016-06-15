//DB schema:
var users = require('../users_schema'),  
    user = require('../user_schema');      

//MDL function:

exports.loginAuth = function (req,res){
    var username = req.body.username,
        password = req.body.password;
    users.findOne({username: username, password:password}, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send();
        }
        if (!user){ 
            console.log('user not found');
            return res.status(404).send();
        }
        console.log('user: ' + username + ' found! ' );
        return res.redirect('/login/cal4today/'+username+'/04/06/2016');
    })  
}

exports.cal4today = function(req, res){
    var ttlCal = 'your daily calories consumption: ',
        _username = req.params.username,
        _today = req.params.d +'/'+ req.params.m +'/'+ req.params.y;
    user.find({username: _username},function (err, obj){
        if(err) throw err;
        if (obj==0){    
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER username: <b>' + req.params.username +
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else{
            obj.forEach(function(element){
               element.dailyGraph.forEach(function(val){
                if (val.date == _today){
                    console.log(val);
                    ttlCal += val;
                }     
            });
            //res.send(ttlCal);//try to use: JSON.parse(ttlCal) to show as JSON
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>Hello ' + obj[0].fullName + 
            '</h1><h3>your daily calories consumption:</h3>'+
            '<h2>'+JSON.stringify(ttlCal)+
            '</h2>'+
            '</body></html>');
        });
        }
    })        

};

exports.userProfile = function(req, res){
    var _username = req.params.username;
    user.find({username:_username},function (err, obj){
        if(err) throw err;
        if (obj==0){
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER username: <b>' + req.params.username +
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else
            console.log(req.body.username);
            res.send(obj);
    });
};

exports.register = (req, res) => {

    var username = req.body.username,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        fullName = firstName + " " + lastName;
        // age = req.body.age,
        // weight = req.body.weight,
        // height = req.body.height,
        // BMIScore = req.body.BMIScore,
        // gender = req.body.gender;
    users.findOne({username: username}, (err, data) => {
        if(err) return res.status(500).send(err);
        if(data) res.status(400).json({status: "user already exists"});
        else{
            var newUser = new users({
                username: username,
                password: password
            });
            newUser.save((err, doc) => {
                if(err) return res.status(500).send(err);
                else res.status(200).json(doc);
            });
        }
    });
    user.findOne({username: username}, (err, data) => {
        if(err) return res.status(500).send(err);
        if(!data){
            var newUser = new user({
                username: username,
                fullName: fullName,
                age: 0,
                trainingRoutine: [],
                BMI: {},
                dailyGraph: []
            });
            newUser.save((err, doc) => {
                if(err) return res.status(500).send(err);
                else res.status(200).json(doc);
            });
        }
    });
};