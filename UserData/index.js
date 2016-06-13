'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events;

class userData extends EventEmitter {
	constructor(data){
		super();
		this.data = data;
		this.json = null;
		
		this.on(eventsConfig.GETUSERBYID, (id) => {
			console.log('on getById: ' + id);
			this.json = data;
		});

		this.on(eventsConfig.UPDATEUSERBMI, (BMI) => {
			console.log('on updateBMI:\n' + BMI.gender + '\n' + BMI.height + '\n' + BMI.weight + '\n' + BMI.BMIScore + '\n');
			if (BMI.gender != null) data.BMI.gender = BMI.gender;
			if (BMI.gender != null) data.BMI.weight = BMI.weight;
			if (BMI.gender != null) data.BMI.height = BMI.height;
			if (BMI.gender != null) data.BMI.BMIScore = BMI.BMIScore;
			this.json = data;
		});
	}

	getUserById(id) {
       	this.emit(eventsConfig.GETUSERBYID, id);
       	return this.json;
    }

    updateUserBMI(BMI){
    	this.emit(eventsConfig.UPDATEUSERBMI, BMI);
    	return this.json;
    }
}
module.exports = userData;