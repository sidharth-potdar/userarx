import React from "react";
import App from './App.js';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.jsx";
import Amplify from 'aws-amplify';
//
// import AWSAppSyncClient from "aws-appsync";
// import { Rehydrated } from 'aws-appsync-react';
// import { ApolloProvider } from 'react-apollo';

import awsconfig from './aws-exports'
import appSyncConfig from './appsync.js';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";


Amplify.configure(awsconfig)

const hist = createBrowserHistory();

// const client = new AWSAppSyncClient({
//   url: appSyncConfig.aws_appsync_graphqlEndpoint,
//   region: appSyncConfig.aws_appsync_region,
//   auth: {
//     type: appSyncConfig.aws_appsync_authenticationType,
//     apiKey: appSyncConfig.aws_appsync_apiKey,
//   }
// });
//
// const WithProvider = () => (
//   <ApolloProvider client={client}>
//     <Rehydrated>
//       <App/>
//     </Rehydrated>
//   </ApolloProvider>
// );

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
