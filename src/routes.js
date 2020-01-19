import Sessions from "views/docs/Sessions.jsx";
import Board from "views/board/Board.jsx";
import Insights from "views/insights/Insights.jsx";
import Prioritization from "views/prioritization/Prioritization.jsx";

import Login from "views/pages/Login.jsx";
import Register from "views/pages/Register.jsx";

const routes = [
  {
    path: "/docs",
    name: "Sessions",
    icon: "nc-icon nc-bullet-list-67",
    component: Sessions,
    layout: "/project"
  },
  {
    path: "/board",
    name: "Board",
    icon: "nc-icon nc-layout-11",
    component: Board,
    layout: "/project"
  },
  {
    path: "/insights",
    name: "Insights",
    icon: "nc-icon nc-bulb-63",
    component: Insights,
    layout: "/project"
  },
  {
    path: "/prioritization",
    name: "Prioritization",
    icon: "nc-icon nc-bulb-63",
    component: Prioritization,
    layout: "/project"
  },
  {
    collapse: true,
    name: "Account",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/sign-up",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth"
      },
    ]
  },
];

export default routes;
