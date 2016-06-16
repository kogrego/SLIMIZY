
var userDataSchema = require('../user_schema'),
	userLoginSchema = require('../users_schema');

exports.getUserByUsername = (req, res) => {
	var query = userDataSchema.findOne({username:req.params.username});
  	query.exec((err, data) => {
		if (err) return res.send(err);
		res.status(200).json(data);
	});
};

exports.updateUserBMI = (req, res) => {
	var BMI = 
		{
			gender: req.body.gender,
			weight: req.body.weight,
			height: req.body.height,
			BMIScore: req.body.BMIScore
		};
  	var query = userDataSchema.findOne({username:req.params.username});
  	query.exec((err, data) => {
		if (err) return res.send(err);
		if (BMI.gender != null) data.BMI.gender = BMI.gender;
		if (BMI.gender != null) data.BMI.weight = BMI.weight;
		if (BMI.gender != null) data.BMI.height = BMI.height;
		if (BMI.gender != null) data.BMI.BMIScore = BMI.BMIScore;
		query = data.save((err) => {
			if (err) return res.send(err);
			else res.status(200).json({"result":"BMI for user " + data.fullName + " was updated"});	
		});
	});	
};

exports.deleteUser = (req, res) => {
	var query = userDataSchema.findOne({username:req.params.username}).remove();
  	query.exec((err) => {
  		if (err) return res.send(err);
  	});
	query = userLoginSchema.findOne({username:req.params.username}).remove();
	query.exec((err) => {
		if (err) return res.send(err);
	});
	res.status(200).json({"result":"user deleted"});
};

exports.cal4today = function(req, res){
	var ttlCal = 'your daily calories consumption: ',
		_username = req.params.username,
		_today = req.params.d +'/'+ req.params.m +'/'+ req.params.y;
	console.log(_username);
	userDataSchema.findOne({username: _username}, (err, obj) => {
		if(err) throw err;
		if (obj==0){
			res.set('Content-Type', 'text/html');
			res.send('<html><body><h1>USER username: <b>' + req.params.username +
				' not found , Please try a different one!</h1></body></html>');
		}
		else{
			obj.dailyGraph.forEach((val) => {
				if (val.date == _today){
					console.log(val);
					ttlCal += val;
				}
				//res.send(ttlCal);//try to use: JSON.parse(ttlCal) to show as JSON
				res.set('Content-Type', 'text/html');
				res.send('<html><body><h1>Hello ' + obj.fullName +
					'</h1><h3>your daily calories consumption:</h3>'+
					'<h2>'+JSON.stringify(ttlCal)+
					'</h2>'+
					'</body></html>');
			});
		}
	})

};
