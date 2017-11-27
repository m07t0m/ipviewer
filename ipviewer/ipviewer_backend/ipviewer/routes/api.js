
var express = require('express');
var router = express.Router();
IPCtrl = require("./../controllers/IPController.js")
//IPCtrl2 = require("./controllers/IPController.js")


// Routes
router.get('/ipdetails', function(req,res){
	var ipData = IPCtrl.getIP();
	res.send(ipData);
})

router.post('/setip', function(req, res){
	var newIP = req.body;
	IPCtrl.setIP(newIP)
	IPCtrl.EngineIP();
	res.json(newIP);
})

module.exports = router;