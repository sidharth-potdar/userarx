import Docs from "views/docs/Docs.jsx";
import Board from "views/board/Board.jsx";
import Insights from "views/insights/Insights.jsx";

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
  }
];

export default routes;
