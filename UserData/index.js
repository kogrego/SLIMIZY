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
			var tempJson = null;
			this.data.forEach((entry) => {
                if(entry.id == id){
                    tempJson = entry;
                }
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