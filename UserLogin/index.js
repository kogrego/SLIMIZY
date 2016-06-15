//DB schema:
var users = require('../users_schema'),  
    user = require('../user_schema');      
    //jsonData = require('../UserData'),
    //mongoose = require('mongoose'),
    //db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),            
    //dbConnect = mongoose.connection;
//MDL function:

exports.loginAuth = function (req,res){
    var id = req.body.id,
        username = req.body.username,
        password = req.body.password;
    users.findOne({id:id, username: username}, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send();
        }
        if (!user){ 
            console.log('user not found');
            return res.status(404).send();
        }
        console.log('user: ' + username + ' found! ' );
        return res.send(user);
    })  
}

exports.cal4today = function(req, res){
    var fs = require('fs'),
        _id = req.params.id, 
        _today = req.params.d +'/'+ req.params.m +'/'+ req.params.y;
    user.find({"dailyGraph.date": _today, id: _id},function (err, obj){
        if(err) throw err;
        if (obj==0){    
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else{
            var myArray = obj.filter(function(obj){
                return console.log(obj.dailyGraph.date === _today);
            });
        }
    })        

};

exports.userProfile = function(req, res){
    var _id = req.params.id; 
    user.find({id:_id},function (err, obj){
        if(err) throw err;
        if (obj==0){
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else
            console.log(req.body.id);
            res.send(obj);
        //mongoose.disconnect();
    });
};