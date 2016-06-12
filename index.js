var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'),			
	dbConnect = mongoose.connection,
 	userLogin = require('./UserLogin'),
 	userData = require('./UserData'),
 	user_schema = require('./user_schema'),
 	users_schema = require('./users_schema'),
 	jsonData = null,
 	login = null,
 	data = null;


app.use(bodyParser.urlencoded({extended: true}));

app.get('/getUserById/:id', (req, res) => {
  	console.log('getUserById');
  	data = new userData();
  	dbConnect.on('error', console.error.bind(console, 'connection error:'));
  	console.log("no DB error");
    console.log("connected to mongoDB");
    jsonData = data.getUserById(req.params.id); 
    mongoose.disconnect();
  	//dbConnect.once('open', () => {
		//console.log("connected to mongoDB");
        //jsonData = data.getUserById(req.params.id); 
		//mongoose.disconnect();
	//});
});

app.post('/setUser', (req, res) => {
  	console.log('setUser');
});

app.post('/login', (req, res) => {
	console.log('login');
});

app.post('/register', (req, res) => {
	console.log('register');
});

app.put('/updateUser/:id', (req, res) => {
  	console.log('updateUser'); 
});

app.delete('/deleteUser/:id', (req, res) => {
  	console.log('deleteUser');
});

app.listen(port, () => {
 	console.log('listening on port: ' + port);
 });