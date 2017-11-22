import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
var ipfilesContext = [];
class IPStore extends EventEmitter {

  setIP(text) {

    this.todos.push({
      text,
      complete: true,
    });

    this.emit("change");
  }
  
  getIPs(action){
    ipfilesContext = action;
    this.emit("change");
  }

  getAllIP() {
    return ipfilesContext;
  }

  handleActions(action) {
    switch(action.type) {      
      case "SET_IP": {
        this.setIP(action.text);
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
