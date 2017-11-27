import React from "react";

import * as ipActions from "../actions/ipActions";
import IPStore from "../stores/IPStore";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class ReloadIP extends React.Component {

	constructor() {
		super();
		this.reloadIP();
		this.getIPs = this.getIPs.bind(this);
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
	getIPs() {
	    this.setState({      
	      ips: IPStore.getAllIP()
	    });
  }
  
  reloadIP() {
    ipActions.reloadIP();
  }

  componentWillMount() {
    IPStore.on("change", this.getIPs);
  }

  componentWillUnmount() {
    IPStore.removeListener("change", this.getIPs);
  }
  foundIPs(){
    var ips = this.state.ips;
    var obj = Object.keys(ips).map(function(key){
      if(ips[key].hasOwnProperty("hostname")){
        return <tr><td><span><b>{key}</b></span></td> <td><span>{ips[key].hostname}</span></td> <td><span>{ips[key].mac}</span></td> <td><span>{ips[key].vendor}</span></td> <td><span>{ips[key].openPorts}</span></td></tr>
      }
    })
    return obj;
  }
  NotFoundIPs(){
    var ips = this.state.ips;
    var products = [];
    Object.keys(ips).map(function(key){
        if(!ips[key].hasOwnProperty("hostname")){
          products.push({key});
        }
    })
    return products;
  }

  render() {  	 
        
    return (
      <div>
        <h1>Received IP details  <button onClick={this.reloadIP.bind(this)} type="submit" class="btn btn-primary btn-lg" style={{float: "right"}}>Reload</button></h1>
        
        <div class="nftable container">
          <h2>Free or not recognized IPs</h2>
    		  <BootstrapTable data={ this.NotFoundIPs() }
          pagination>
    		    <TableHeaderColumn dataField='key' isKey>IP</TableHeaderColumn>
    		  </BootstrapTable>
		    </div>
        <div class="ftable container">
          <h2>IP in use</h2>
          <table class="table table-striped table-bordered table-list table-hover">
            <thead>
              <tr>
                <th>IP</th>    
                <th>hostname</th>            
                <th>Mac</th>
                <th>Vendor</th>
                <th>openPorts</th>

              </tr>
            </thead>
            <tbody>{this.foundIPs()}</tbody>
          </table>
        </div>
      </div>
    );
  }
 }

