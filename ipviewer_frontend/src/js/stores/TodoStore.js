import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
var ipfilesContext = [];
class TodoStore extends EventEmitter {

  
  
  constructor() {

    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

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

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
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

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
