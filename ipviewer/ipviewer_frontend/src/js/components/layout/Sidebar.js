import React from "react";
import { IndexLink, Link } from "react-router";

export default class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
    };
  }
  toggleCollapse() {
	const collapsed = !this.state.collapsed;
	this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;

    return (
      <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
              <li class="sidebar-brand">
                  
                      <a>IP Viewer Menu</a>

              </li>
              <li>
                  <a href="#"><IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Set New IP</IndexLink></a>
              </li>
              <li>
                   <a href="#"><Link to="reloadip" onClick={this.toggleCollapse.bind(this)}>Display IPs</Link></a>
              </li>                
          </ul>
      </div>
    );
  }
}