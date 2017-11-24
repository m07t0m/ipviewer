import React from "react";

import * as ipActions from "../actions/ipActions";
import IPStore from "../stores/IPStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.updateInputValue = this.updateInputValue.bind(this);
    this.reloadIP.bind(this);
    this.state = {
      ips: IPStore.getAllIP(),
      inputfield:''
    };
  }

  componentWillMount() {
    IPStore.on("change", this.getIPs);
  }

  componentWillUnmount() {
    IPStore.removeListener("change", this.getIPs);
  }

  getIPs() {
    this.setState({
      ips: IPStore.getAllIP()
    });
  }

  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    this.state={inputfield: evt.target.value};   

  }

  createIP() {
    ipActions.setIP(this.state.inputfield);
  }
  
  reloadIP() {
    ipActions.reloadIP();
  }
  render() {
    const { ips } = this.state;
    const { inputfield } = this.state;
//    const TodoComponents = todos.map((todo) => {
//        return <Todo key={todo.id} {...todo}/>;
//    });
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
          <button onClick={this.createIP.bind(this)} type="submit" class="btn btn-primary btn-lg">Submit</button>
        </form>
      </div>
      )
  }
}
