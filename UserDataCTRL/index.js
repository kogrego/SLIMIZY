
var userDataSchema = require('../user_schema');

exports.getUserById = (req, res) => {
	var query = userDataSchema.findOne({id:req.params.id});
  	query.exec((err, data) => {
		if (err) res.send(err);
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
  	var query = userDataSchema.findOne({id:req.params.id});
  	query.exec((err, data) => {
		if (err) res.send(err);
		if (BMI.gender != null) data.BMI.gender = BMI.gender;
		if (BMI.gender != null) data.BMI.weight = BMI.weight;
		if (BMI.gender != null) data.BMI.height = BMI.height;
		if (BMI.gender != null) data.BMI.BMIScore = BMI.BMIScore;
		query = data.save((err) => {
			if (err) res.send(err);
			else res.status(200).json({"result":"BMI for user " + data.fullName + " was updated"});	
		});
	});	
};

exports.deleteUser = (req, res) => {
	var query = userDataSchema.findOne({id:req.params.id}).remove();
  	query.exec((err) => {
  		if (err) res.send(err);
		else res.status(200).json({"result":"user deleted"});
  	});	
};
