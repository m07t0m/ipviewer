import dispatcher from "../dispatcher";
import request from 'superagent';

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text,
  });
}
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
    dispatcher.dispatch({
    type: "SET_IP"    
  });  
  })

  
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id,
  });
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

 export function reloadTodos() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_TODOS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
      {
        id: 8484848484,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6262627272,
        text: "Hug Wife",
        complete: true
      },
    ]});
  }, 1000);
}

    //(data) => {
     //console.log("got the data!", data);
   
    //dispatcher.dispatch({type: "FETCH_IP"});
  
    //dispatcher.dispatch({type: "RECEIVE_IP", ips: [
    //  {
    //    id: 8484848484,
    //    text: "Go Shopping Again",
    //    complete: false
    //  },
    //  {
    //    id: 6262627272,
    //    text: "Hug Wife",
    //    complete: true
    //  },
   // ]});
    //})

//export function setIP(){
//  dispatcher.dispatch({type: "SET_IP"});
//
//  addapi
//}

//export function getAllIP(){
//  dispatcher.dispatch({type: "GET_IP"});
//
//  getip
//}
