import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
var ipfilesContext = [];
var setIPResult=false;
//var modalState=false;
class IPStore extends EventEmitter {

  setIP(text) {

    setIPResult = text;
    this.emit("change");
  }
  
  getIPs(action){
    ipfilesContext = action;
    this.emit("change");
  }

  //setIPresult() {
  //  return setIPResult;
  //}

  getAllIP() {
    return ipfilesContext;
  }
/*
  GetModalState(){
    this.emit("change");
    return modalState;
  }

  ChangeModalState(){
    if(modalState==false){
      modalState=true;
    }
    else{
      modalState=false;
    }
  }*/

  handleActions(action) {
    switch(action.type) {      
      case "SET_IP": {
        this.setIP(action.answer);
        break; 
      }
      case "RECEIVE_IP": {
        this.getIPs(action.ips);
        break;
      }
    }
  }

}

const ipStore = new IPStore;
dispatcher.register(ipStore.handleActions.bind(ipStore));

export default ipStore;
