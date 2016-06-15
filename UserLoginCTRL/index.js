//DB schema:
var users = require('../users_schema'),  
    user = require('../user_schema');      

//MDL function:

exports.loginAuth = function (req,res){
    var id = req.body.id,
        username = req.body.username,
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
        return res.redirect('/login/cal4today/'+id+'/04/06/2016');
    })  
}

exports.cal4today = function(req, res){
    var ttlCal = null,
        _id = req.params.id, 
        _today = req.params.d +'/'+ req.params.m +'/'+ req.params.y;
    user.find({"dailyGraph.date": _today, id: _id},function (err, obj){
        if(err) throw err;
        if (obj==0){    
            res.set('Content-Type', 'text/html');
            res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
        }
        else{obj.forEach(function(element){
               element.dailyGraph.forEach(function(val){
                if (val.date == _today){
                    console.log(val);
                    ttlCal += val;
                }     
            });
            //res.send(ttlCal);//try to use: JSON.parse(ttlCal) to show as JSON
                      res.send('<html><body><h1>USER ID: <b>' + req.params.id + 
                     ' not found , Please try a different one!</h1></body></html>');
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