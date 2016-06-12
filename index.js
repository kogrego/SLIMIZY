var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),			
	dbConnect = mongoose.connection,
 	userLogin = require('./UserLogin'),
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
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/user/:id', (req, res) => {
  	console.log('getUserById');
  	var query = userDataSchema.find({}).where('id').equals(req.params.id);
  	query.exec((err, data) => {
		if (err) res.send(err);
		UserData = new userData(data);
		console.log('userData created');
		jsonData = UserData.getUserById(req.params.id); 
		res.status(200).json(jsonData);
	});
});

app.get('/recipes/:calories/:searchTerm', (req, res) =>{
	// Foods = new foods();
	// jsonData = Foods.getFoodsByCalories(req.params,searchTerm, req.params.calories);
	// res.status(200).json(jsonData);
});

app.post('/login', (req, res) => {
	console.log('login');
});

app.post('/register', (req, res) => {
	console.log('register');
});

app.put('/user/BMI/:id', (req, res) => {
  	console.log('updateUser');
  	var query = userDataSchema.find({}).where('id').equals(req.params.id);
  	query.exec((err, data) => {
		if (err) res.send(err);
		UserData = new userData(data);
		console.log('userData created');
		var BMI = {
			gender: req.body.gender,
			weight: req.body.weight,
			height: req.body.height,
			BMIScore: req.body.BMIScore
		}
		jsonData = UserData.updateUserBMI(BMI);
		// jsonData.save((err) => {
		// 	if (err) res.send(err);
		// 	res.status(200).json(jsonData);
		// }); 
	}); 
});

app.put('/user/trainingRoutine/:id', (req, res) => {
  	console.log('updateUser'); 
});

app.put('/user/dailyGraph/:id', (req, res) => {
  	console.log('updateUser'); 
});

app.delete('/user/:id', (req, res) => {
  	console.log('deleteUser');
  	var query = userDataSchema.find({}).where('id').equals(req.params.id).remove();
  	query.exec();
});	

app.listen(port, () => {
 	console.log('listening on port: ' + port);
 });