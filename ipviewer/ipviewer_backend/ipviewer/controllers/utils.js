var fs = require("fs");
var async = require("async");
FModel = require("./../model/filesModel.js")

function addToLog(responseData){

	var result = FModel.GetIPList();

	var ipContJSON = JSON.parse(result);

	responseData.forEach(function(value){		
		if(!ipContJSON.hasOwnProperty(value.ip)){
			console.log("Setup has changed before Engine processed ip list");
		}
		else{
			console.log("Record for ip {0} has changed" + value.ip);						
			ipContJSON[value.ip] = value;
		}
	});

	FModel.SetIPList(ipContJSON);
}

function createIPTemp(ipVal){
	var obj= {};
	for (var index = 0; index < 256; ++index) {
		var ip = ipVal+"."+index;
		obj[ip] = { "isFilled" : false}; 
		//console.log(JSON.stringify(obj));			
	}

	FModel.SetIPList(obj);

}




module.exports = 
{
	addToLog : addToLog,
	//setInConfigFile : setInConfigFile,
	createIPTemp : createIPTemp,
	//SetNewIP : SetNewIP
}