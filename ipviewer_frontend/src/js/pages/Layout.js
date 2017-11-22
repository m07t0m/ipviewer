import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import Sidebar from "../components/layout/Sidebar";


export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>

        <div id="wrapper" class="toggled">
          <Sidebar location={location} />
        
          
          <div id="page-content-wrapper">
          <Nav location={location} />

            <div class="container" style={containerStyle}>
              <div class="row">
                <div class="col-lg-12">

                  {this.props.children}

                </div>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
