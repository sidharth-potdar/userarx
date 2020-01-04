import Docs from "views/docs/Docs.jsx";
import Board from "views/board/Board.jsx";
import Insights from "views/insights/Insights.jsx";

const routes = [
  {
    path: "/docs",
    name: "Docs",
    icon: "nc-icon nc-bullet-list-67",
    component: Docs,
    layout: "/admin"
  },
  {
    path: "/board",
    name: "Board",
    icon: "nc-icon nc-layout-11",
    component: Board,
    layout: "/admin"
  },
  {
    path: "/insights",
    name: "Insights",
    icon: "nc-icon nc-bulb-63",
    component: Insights,
    layout: "/admin"
  }
];

export default routes;
