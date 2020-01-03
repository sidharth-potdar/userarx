import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import InsightCard from "./InsightCard.jsx";

export default class Insights extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <InsightCard description="Users don't know how to login."/>
          <InsightCard description="We need better menu navigation to help users find our features."/>
        </Row>
        <Row>
          <InsightCard description="Users don't know how to login."/>
        </Row>
      </div>
    )
  }
}
