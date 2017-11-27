var fs = require("fs");

function GetIPList(){
	console.log('GetIPList trigerred.');
	return fs.readFileSync('ipStore.dat');

}

function SetIPList(data){
	//console.log("SetIPList trigerred - "+JSON.stringify(data));
	fs.writeFileSync("IpStore.dat",JSON.stringify(data),'utf8');
	//console.log(JSON.stringify(data));
}

function GetConfigFile(){
	try
	{
		console.log('config.txt');
		return fs.readFileSync("config.txt")	
	}
	catch(err)
	{
		console.log('config.txt - error');
		if (err.code === 'ENOENT') {
			return false;
		}
	}
	
}

function SetConfigFile(data){
	console.log("SetIPList trigerred - "+data.length);
	fs.writeFileSync("config.txt", JSON.stringify(data),'utf8');
	//console.log(JSON.stringify(data));
}

module.exports = 
{
	GetIPList : GetIPList,
	SetIPList : SetIPList,
	GetConfigFile : GetConfigFile,
	SetConfigFile : SetConfigFile	
}