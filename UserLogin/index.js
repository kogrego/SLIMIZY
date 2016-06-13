//DB schema:
var user = require('../users_schema');
var userData = require('../user_schema');

//MDL function:

exports.loginAuth = function (req,res){
    var _id = req.body.id;
    var _username = req.body.username;
    var _password = req.body.password;

    user.findOne({id:_id, username: _username , password: _password}, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send();
        }
        if (!user){ 
            console.log('user not found');
            return res.status(404).send();
        }
        console.log('user:' + _username + 'found!');
        var jsonData = userData.getUserById(_id); 
        return res.send(jsonData);
    })  
}
exports.cal4today = function(req, res){
    var today = req.params.today;
    userData.dailyGraph.find({date:today},function(err, obj){
            if (err) throw err;
            console.log('hi');
            res.send(obj);
         });
};
exports.showAllHistory = function(req, res){
    user.find({},function(err, obj){
            if (err) throw err;
            res.send(obj);
            //mongoose.disconnect();
         });
};
exports.showBMI = function(req, res){
    userData.find({}).where('id').equals('1').exec(function(err, obj){
            if (err) throw err;
            res.send(obj);
            console.log("test");
            //mongoose.disconnect();
         });
};
exports.userProfile = function(req, res){
    console.log("test"); 
    user.find({}).exec(function (err, obj){
        if(err) throw err;
        if (!obj){
            console.log("BYE");
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>showing result for user id: <b>' + req.params.usrID + 
                     '</b></br>USER ID not found , Please try a different one!</h1></body></html>');
        }
        else
            res.send(obj);
        //mongoose.disconnect();
    });
};