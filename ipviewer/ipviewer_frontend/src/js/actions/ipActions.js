import dispatcher from "../dispatcher";
import request from 'superagent';

export function setIP(ip){
  request.post("http://localhost:3000/setip")
  .withCredentials()
  .set('Content-Type', 'application/json')
  .send({"value" : ip})
  //.set('Access-Control-Allow-Origin', '*')
  //.set('Content-Type', 'application/json')
  //.send({"value" : ip})
  .end(function(err,res){
    //var ipToSet = JSON.parse(res.text);
    var answer=false;
    //if(err){
    //  answer = false;
    //}
    //else{
    //  if(res.statusCode==200)
    //    answer=true;
    //  else
    //    answer=false;
    //}
    dispatcher.dispatch({
    type: "SET_IP",
    answer: answer
  });  
  })

  
}

export function reloadIP() {
   request.get("http://localhost:3000/ipdetails")
   .withCredentials()
   .end(function(err,res){
    var ip = JSON.parse(res.text);
     dispatcher.dispatch({
        type: "RECEIVE_IP", 
        ips: ip
      });

    });
 }