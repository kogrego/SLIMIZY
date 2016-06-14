//DB schema:
var user = require('../users_schema'),  
    userData = require('../user_schema'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),            
    dbConnect = mongoose.connection;
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
    var _id = req.params.id; 
    var _today = req.params.d +'/'+ req.params.m +'/'+ req.params.y; 
    console.log(_today);
    userData.find({"dailyGraph.date": _today, id: _id},function (err, obj){
        if(err) throw err;
        if (obj==0){    
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else{
            res.send(obj[0].dailyGraph[0]);  
        }
    })        

};

exports.userProfile = function(req, res){
    var _id = req.params.id; 
    userData.find({id:_id},function (err, obj){
        if(err) throw err;
        if (obj==0){
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else
            res.send(obj);
        //mongoose.disconnect();
    });
};