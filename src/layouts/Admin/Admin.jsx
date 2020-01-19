import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import { Auth } from 'aws-amplify';

import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import routes from "routes.js";
import './admin.css';

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      activeColor: "info",
      sidebarMini: false,
      projects: []
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    this.queryForProjects();
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  async queryForProjects() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getProjects,
        {
          pk: "521b3bca-aa8f-40c3-a0e1-9fc124b35152",
          sk: "project",
          creator: sessionStorage.getItem("userID")
        }
      ))
      console.log(response.data.getProjects)
      this.setState({
        projects: response.data.getProjects,
      })
      sessionStorage.setItem("projects", JSON.stringify(this.state.projects));
      console.log("projects", this.state.projects)
    }
    catch (error) {
      console.log('error', error)
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/project") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };
  render() {
    return (
      <div className="wrapper mountains">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          projects={this.state.projects}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
          />
          <Switch style={{ backgroundColor: 'red'}}>
            {this.getRoutes(routes)}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Admin;
