import React from "react";

import * as ipActions from "../actions/ipActions";
import IPStore from "../stores/IPStore";


export default class SetIP extends React.Component {
  constructor() {
    super();
    //this.displayModal = this.displayModal.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      inputfield:'',
      //modalValue: IPStore.setIPresult()
    };
  }

  updateInputValue(evt){
    this.state={inputfield: evt.target.value};   

  }

  createIP() {
    var typeIP = this.state.inputfield;
    if(!this.CheckIP(typeIP))
    {
       return;
    }

    if((typeIP.split(".").length - 1)==3)
    {
      typeIP = typeIP.substring(0,typeIP.lastIndexOf("."));
    
    }

    ipActions.setIP(typeIP); 
  }

  //componentWillUpdate() {
  //  IPStore.on("change", this.displayModal);
  //}

  //componentWillUnmount() {
  //  IPStore.removeListener("change", this.displayModal);
  //}

  CheckIP(ip){
    if(ip.length<7 || ip.length>15)
    {
      return false;
    }
    if((ip.split(".").length - 1)!=3 && (ip.split(".").length - 1)!=2)
    {
      return false; 
    }
    return true;

  }

  //displayModal() {
  //    this.setState({     
  //      modalValue: IPStore.setIPresult()
  //    });
  //    return this.state.modalValue;
  //}

  render() {
    const { inputfield } = this.state;
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
