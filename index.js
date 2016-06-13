var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),			
	dbConnect = mongoose.connection,
 	//userLogin = require('./UserLogin'),
    //router = express.Router();
 	userData = require('./UserData'),
 	foods = require('./Foods'),
 	userDataSchema = require('./user_schema'),
 	users_schema = require('./users_schema'),
 	jsonData = null,
 	login = null,
 	UserData = null,
 	Foods = null;

dbConnect.once('open', () => {
	console.log("connected to mongoDB");
    userDataSchema.find({} ,(err, data) => {
		if (err){
			console.log(err);
			return console.log(err);
		} 
		UserData = new userData(data);
		console.log('userData created');
		mongoose.disconnect();
	});
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/user/:id', (req, res) => {
  	console.log('getUserById');
  	dbConnect.on('error', console.error.bind(console, 'connection error:'));
    jsonData = UserData.getUserById(req.params.id); 
	res.status(200).json(jsonData);
});

app.get('/recipes/:calories/:searchTerm', (req, res) =>{
	// Foods = new foods();
	// jsonData = Foods.getFoodsByCalories(req.params,searchTerm, req.params.calories);
	// res.status(200).json(jsonData);
});

app.post('/login',(req,res) => {
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
});


app.post('/register', (req, res) => {
	console.log('register');
});

app.put('/user/:id', (req, res) => {
  	console.log('updateUser'); 
});

app.delete('/user/:id', (req, res) => {
  	console.log('deleteUser');
});

app.listen(port, () => {
 	console.log('listening on port: ' + port);
 });