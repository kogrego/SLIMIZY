var express = require('express');
var app = express();
var port = 8080;
app.use('/',express.static('./public')).listen(port);
console.log('client is listening on port' + port);