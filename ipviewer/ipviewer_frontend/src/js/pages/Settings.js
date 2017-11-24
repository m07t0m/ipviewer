import React from "react";

import * as ipActions from "../actions/ipActions";
import IPStore from "../stores/IPStore";


export default class Settings extends React.Component {

	constructor() {
		super();
		this.reloadIP();
		this.getTodos = this.getTodos.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
		this.state = {
		  ips: IPStore.getAllIP(),
		  inputfield:''
		};
  	}
  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    this.state={inputfield: evt.target.value};   

  }
	getTodos() {
	    this.setState({      
	      ips: IPStore.getAllIP()
	    });
  }
  
  reloadIP() {
    ipActions.reloadIP();
  }

  componentWillMount() {
    IPStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    IPStore.removeListener("change", this.getTodos);
  }
  render() {
  	 const { ips } = this.state;
  	 
  	 const IPScomponents = Object.keys(ips).map(function(key){
      if(ips[key].hasOwnProperty("hostname")){
        return <tr><td><span>{key}</span></td> <td><span>{ips[key].vendor}</span></td> <td><span>{ips[key].mac}</span></td></tr>
      }
 	})
      
    return (
      <div>
        <h1>Received IP details  <button onClick={this.reloadIP.bind(this)} type="submit" class="btn btn-primary btn-lg">Reload</button></h1>
        
        <div class="container">
		  <table class="table table-bordered">
		    <thead>
		      <tr>
		        <th>IP</th>
		        <th>Vendor</th>
		        <th>Email</th>
		      </tr>
		    </thead>
		    <tbody>{IPScomponents}</tbody>
		  </table>
		</div>

      </div>
    );
  }
 }

