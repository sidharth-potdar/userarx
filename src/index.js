import React from "react";
import App from './App.js';
import ReactDOM from "react-dom";
import AdminLayout from "layouts/Admin/Admin.jsx";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import appSyncConfig from './appsync.js';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";

Amplify.configure(awsconfig)

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
