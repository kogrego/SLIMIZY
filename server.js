var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
    //mongoose = require('mongoose'),
	// db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),			
	// dbConnect = mongoose.connection,
 	userLogin = require('./UserLoginCTRL'),
    router = express.Router();
 	userData = require('./UserDataCTRL'),
 	foods = require('./Foods'),
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
// 		//    mongoose.disconnect();
// 	});
// });

//Use for POST/PUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use('/', express.static('./public'));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    next();
});
//Routs & Callback functions:
// app.get('/', (req, res, next)=>{
// 	res.sendFile(__dirname + '/index.html');
// });

app.get('/user/:id', userData.getUserById);

app.get('/recipes/:calories/:searchTerm', (req, res) =>{
	// Foods = new foods();
	// jsonData = Foods.getFoodsByCalories(req.params,searchTerm, req.params.calories);
	// res.status(200).json(jsonData);
});

app.post('/loginAuth', userLogin.loginAuth);

app.get('/login/cal4today/:id/:d/:m/:y', userLogin.cal4today);

app.get('/login/userProfile/:id', userLogin.userProfile);

app.put('/user/BMI/:id', userData.updateUserBMI);

app.post('/register', (req, res) => {
	console.log('register');
});

app.delete('/user/:id', userData.deleteUser);

app.listen(port, () => {
 	console.log('listening on port: ' + port);
 });
