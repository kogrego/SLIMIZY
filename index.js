var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
    // mongoose = require('mongoose'),
	// db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),			
	// dbConnect = mongoose.connection,
 	userLogin = require('./UserLogin'),
    //router = express.Router();
 	userData = require('./UserData'),
 	foods = require('./Foods'),
 	userDataSchema = require('./user_schema'),
 	users_schema = require('./users_schema'),
 	jsonData = null,
 	login = null,
 	UserData = null,
 	Foods = null;

// dbConnect.once('open', () => {
// 	console.log("connected to mongoDB");
//     userDataSchema.find({} ,(err, data) => {
// 		if (err){
// 			console.log(err);
// 			return console.log(err);
// 		} 
// 		UserData = new userData(data);
// 		console.log('userData created');
// 		mongoose.disconnect();
// 	});
// });

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

app.post('/loginAuth',(req,res) => {
    userLogin.loginAuth(req, res);
});

app.get('/login/cal4today/:id/:d/:m/:y',(req,res) => {
    userLogin.cal4today(req, res);
});

app.get('/login/userProfile/:id',(req,res) => {
    userLogin.userProfile(req, res);
});

app.put('/user/BMI/:id', (req, res) => {
  	console.log('updateUser');
  	var gender = req.body.gender;
  	var weight = req.body.weight;
  	var height = req.body.height;
  	var BMIScore = req.body.BMIScore;
  	var query = userDataSchema.find({}).where('id').equals(req.params.id);
  	query.exec((err, data) => {
		if (err) res.send(err);
		UserData = new userData(data);
		console.log('userData created' + data);
		var BMI = {
			gender: gender,
			weight: weight,
			height: height,
			BMIScore: BMIScore
		}
		jsonData = UserData.updateUserBMI(BMI);
		userDataSchema.update({},(err, id) => {
			if (err) res.send(err);
			res.status(200).json(data);
		});
	}); 
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