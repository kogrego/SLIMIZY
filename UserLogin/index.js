/*var express = require('express');
var router = express.Router();
var user = require('../user_schema');
var jsonData = null;

router.get('/', (req, res, next) => {
    res.render(__dirname + '/index.html');
});

router.post('/login',(req,res) => {
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
    jsonData = UserData.getUserById(req.params.id); 
    return res.status(200).json(jsonData);
  })  
});*/




/*var config = require('config.json'),
    express = require('express'),
    bodyParser = 
    db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy');
    db.bind('users');

var EventEmitter = require('events').EventEmitter;
    
    //eventsConfig = require('./config').events;

class userLogin extends EventEmitter {
    constructor(data){
        super();
        this.data = data;
        this.json = null;
        
        this.on(eventsConfig.GETBYID, (id) => {
            console.log('on getById: ' + id);
            var tempJson = null;
            this.data.forEach((entry) => {
                if(entry.id == id){
                    tempJson = entry;
                }
            });
            this.json = tempJson;
        });
    }

//     function getById(_id) {
//         var deferred = Q.defer();

//         db.users.findById(_id, function (err, user) {
//             if (err) deferred.reject(err);

//             if (user) {
//                 // return user (without hashed password)
//                 deferred.resolve(lodash.omit(user, 'hash'));
//             } else {
//                 // user not found
//                 deferred.resolve();
//             }
//         });

//         return deferred.promise;
//     }

    getUserById(id) {
       this.emit(eventsConfig.GETBYID, id);
       return this.json;
    }
//     function authenticate(username, password) {
//     var deferred = Q.defer();

//     db.users.findOne({ username: username }, function (err, user) {
//         if (err) deferred.reject(err);

//         if (user && bcrypt.compareSync(password, user.hash)) {
//             // authentication successful
//             deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
//         } else {
//             // authentication failed
//             deferred.resolve();
//         }
//     });

//     return deferred.promise;
// }




}
module.exports = userLogin;


*/





