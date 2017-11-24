var ping = require("ping");
var nmap = require("node-nmap");
var async = require("async");
var fs = require("fs");
utils = require("./utils.js")
filesModel = require("./../model/filesModel.js")
var count=0;
nmap.nmapLocation = 'nmap'; //default 

function EngineIP(){

	var confCont = filesModel.GetConfigFile()
	if(confCont==false)
	{
		console.log("Engine not yet started - config.txt: "+confCont)
		return;
	}
	console.log("Engine started!")
	var ipContJSON = JSON.parse(confCont);

	var ipMap = '';
	for (var i=0;i<256;i++){
		ipMap += ipContJSON.ipValue+'.'+i+' ';	
	}
	//console.log(ipMap);

	var nmapscan = new nmap.NmapScan(ipMap, '-sn');
	
	nmapscan.on('complete',function(data){
		console.log("On complete. Number of adresse updated: "+data.length);
		if(count==3){
			console.log("Clear ipStore");
			utils.createIPTemp((JSON.parse(filesModel.GetConfigFile())).ipValue);
			count = 0;
		}
		utils.addToLog(data);

		setTimeout(
			function(){
				count++;
				EngineIP()
			},
		 	100000)
	});

	nmapscan.on('error', function(error){
	  	console.log(error);
	});
		 
	nmapscan.startScan();
}

function getIP(){
	console.log("GetIP function triggered.");
	return filesModel.GetIPList();
}

function setIP(ipValue){
	console.log("setIP function triggered with ipValue equal: "+ipValue.value+" "+ipValue+" "+JSON.stringify(ipValue))
	console.log(JSON.stringify(ipValue));
	var cFileContent = filesModel.GetConfigFile();
	if(cFileContent==false){
		var data = { "ipValue" : ipValue.value };	
		filesModel.SetConfigFile(data);
		utils.createIPTemp(ipValue.value);
		return;
	}

	if(cFileContent.ipValue!=ipValue.value){
		var data = { "ipValue" : ipValue.value };	
		filesModel.SetConfigFile(data);
		utils.createIPTemp(ipValue.value);
		return;
	}
}



module.exports = 
{
	setIP : setIP,
	getIP : getIP,
	EngineIP : EngineIP
		
}