 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 ipCtrl = require('./controllers/IPController.js');
 var async = require("async");
 var xor = require('base64-xor');
 var cors = require("cors");
 //connect to mongoose
 /*mongoose.connect('mongodb://localhost/ipviewer',{
 	  useMongoClient: true
 }
 	);
var db = mongoose.connection;

 app.get('/', function(req, res){
 	res.send('dupa runnning');

 });*/
app.use(cors({origin: 'http://localhost:8080/ipdetails'}));
app.use(cors({origin: 'http://localhost:8080/setip'}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
 app.use(bodyParser.urlencoded({ extended: true}));
 app.use(bodyParser.json());

 app.use('', require('./routes/api'));
 //console.log("pierwszy  --- "+xor.decode('clhFVUJJXmVJQUVCWUNlCBwLUgsBMAwEClJEUyEXAAQBBgQkFhVFFgZTMBUZABgMBysXAwYbSRplHB8WBQASIRsKABwAEmUoAgoVGxIoEQMRCw==', 'Experis'));

 //console.log("pierwszy  --- "+xor.encode('clhFVUJJXmVJQUVCWUNlCBwLUgsBMAwEClJEUyEXAAQBBgQkFhVFFgZTMBUZABgMBysXAwYbSRplHB8WBQASIRsKABwAEmUoAgoVGxIoEQMRCw==', 'Experis'));

 app.listen(3000);

 //setInterval(function() {ipCtrl.EngineIP()},20000);
 ipCtrl.EngineIP();
 //function dupa(){
 	//ipParser.getIP();
 //}

//setInterval(ipParser.setIP, 10000);
/*async.waterfall([
    function (cb) {
		ipParser.setIP("192.168.1",cb);
		
	}, function (cb) {
		//console.log("dupa dupa");
		ipParser.getIP(cb);
		
	}], 
	function (err) {
	    if (err) {
	        console.log("Some error:" + err);
	        //setTimeout(function(){process.exit(1);},10000);
	    }
	});*/
 console.log('running....');