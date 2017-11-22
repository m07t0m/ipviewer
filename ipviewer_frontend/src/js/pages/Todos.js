import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      ips: TodoStore.getAllIP(),
      inputfield:''
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
      ips: TodoStore.getAllIP()
    });
  }

  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    this.state={inputfield: evt.target.value};   

  }

  createTodos() {
    TodoActions.createTodo(this.state.inputfield);
  }

  createIP() {
    TodoActions.setIP(this.state.inputfield);
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  reloadIP() {
    TodoActions.reloadIP();
  }
  render() {
    const { todos } = this.state;
    const { ips } = this.state;
    const { inputfield } = this.state;
    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });
    /*
    const IPScomponents = Object.keys(ips).map(function(key){
      if(ips[key].hasOwnProperty("hostname")){
        return <li><span>{key}</span> <span>{ips[key].vendor}</span> <span>{ips[key].mac}</span></li>
      }
      
    })
    */
    //const IPScomponents = [];
    //for (var key in ips){
    //  IPScomponents.add(<li> {key} </li> ) 
    //}
    //const IPScomponents = ips.map((ip) => {
    //  return <li><span>{ip.ip}</span><span>{ip.mac}</span><span>{ip.vendor}</span> </li>
    //})
    /*
    return (
      <div>        
        <button onClick={this.createIP.bind(this)}>CreateIP</button>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <button onClick={this.reloadIP.bind(this)}>Reload IP!</button>
        <input type="text" onChange={this.updateInputValue} ></input>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
        <h1>IPs</h1>
        <ul>{IPScomponents}</ul>
      </div>
    );
    */
    return (
      <div class="container">
        <h1>Set new IP</h1>
        <form >
          <div class="form-group">
            <input class="form-control" placeholder="IP" type="text" onChange={this.updateInputValue} ></input>
          </div>
          <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </form>
      </div>
      )
  }
}
