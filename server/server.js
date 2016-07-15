var express = require('express'),
    app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
 	userLogin = require('./UserLoginCTRL'),
 	userData = require('./UserDataCTRL'),
    mongoose = require('mongoose');
config = {
    mongoUrl:'mongodb://slimUser:slimPass@ds019950.mlab.com:19950/db_slimizy'
};
console.log('connection');
//The server option auto_reconnect is defaulted to true
var options = {
    server: {
        auto_reconnect:true,
    }
};
mongoose.connect(config.mongoUrl, options);
db = mongoose.connection;// a global connection variable

// Event handlers for Mongoose
db.on('error', (err) => {
    console.log('Mongoose: Error: ' + err);
});
db.on('open', () => {
    console.log('Mongoose: Connection established');
});
db.on('disconnected', ()=> {
    console.log('Mongoose: Connection stopped, recconect');
    mongoose.connect(config.mongoUrl, options);
});
db.on('reconnected', () => {
    console.info('Mongoose reconnected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', express.static('./public'));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    next();
});

app.get('/user/:username', userData.getUserByUsername);

app.get('/user/dailyGraph/:username', userData.getDailyGraph);

app.post('/login', userLogin.login);

app.put('/user/BMI/:username', userData.updateUserBMI);

app.post('/register', userLogin.register);

app.post('/user/addCals/:username', userData.addCalories);

app.post('/user/removeCals/:username', userData.removeCalories);

app.delete('/user/:username', userData.deleteUser);

app.listen(port, () => {
 	console.log('listening on port: ' + port);
});
