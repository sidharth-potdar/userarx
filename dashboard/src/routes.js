import Docs from "views/docs/Docs.jsx";
import Board from "views/board/Board.jsx";
import Insights from "views/insights/Insights.jsx";
import Buttons from "views/components/Buttons.jsx";
import Calendar from "views/Calendar.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import ExtendedForms from "views/forms/ExtendedForms.jsx";
import ExtendedTables from "views/tables/ExtendedTables.jsx";
import FullScreenMap from "views/maps/FullScreenMap.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import GridSystem from "views/components/GridSystem.jsx";
import Icons from "views/components/Icons.jsx";
import LockScreen from "views/pages/LockScreen.jsx";
import Login from "views/pages/Login.jsx";
import Notifications from "views/components/Notifications.jsx";
import Panels from "views/components/Panels.jsx";
import ReactTables from "views/tables/ReactTables.jsx";
import Register from "views/pages/Register.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import RegularTables from "views/tables/RegularTables.jsx";
import SweetAlert from "views/components/SweetAlert.jsx";
import Timeline from "views/pages/Timeline.jsx";
import Typography from "views/components/Typography.jsx";
import UserProfile from "views/pages/UserProfile.jsx";
import ValidationForms from "views/forms/ValidationForms.jsx";
import VectorMap from "views/maps/VectorMap.jsx";
import Widgets from "views/Widgets.jsx";
import Wizard from "views/forms/Wizard.jsx";

const routes = [
  {
    path: "/docs",
    name: "Docs",
    icon: "nc-icon nc-bullet-list-67",
    component: Docs,
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
