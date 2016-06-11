var express = require('express'),
	http = require('http'),
    app = express(),
	port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://db_usr:db_pass@ds013172.mlab.com:13172/studentgrades'),
 	user_schema = require('./user_schema'),
 	users_schema = require('./users_schema');

 
	
