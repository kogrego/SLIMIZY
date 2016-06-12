'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    user_schema = require('../user_schema'),
    eventsConfig = require('./config').events;

class userData extends EventEmitter {
	constructor(){
		super();
		this.json = null;
		this.on(eventsConfig.GETUSERBYID, (id) => {
			console.log('on getById: ' + id);
			var tempJson = null;
			user_schema.find({}).where('id').equals(id).exec((err, data) => {
				if (err) throw err;
				console.log('user JSON:\n' + data);
				tempJson = data;
			});
			this.json = tempJson;
		});
	}

	getUserById(id) {
       this.emit(eventsConfig.GETUSERBYID, id);
       return this.json;
    }
}
module.exports = userData;