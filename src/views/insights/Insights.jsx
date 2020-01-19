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
  constructor(props) {
    super(props);

    this.state = {
      insights: [
        {
          title: "Users don't know how to login.",
          date: "12/34/69",
          description: "They're dumb as hell.",
        },
        {
          title: "We need better menu navigation to help users find our features.",
          date: "03/25/19",
          description: "Our users are having trouble finding features in our app. We need to improve navigation.",
        },
        {
          title: "Users don't want to create an account to try the app.",
          date: "01/13/20",
          description: "We would have more users try the app if they didn't need to create an account first.",
        },
      ],
      showNewInsightModal: false,
    }
  }

  createNewInsight = () => {
    const newInsight = {
      title: "",
      date: "",
      description: "",
      showModal: true
    }
    this.setState(prevState => ({
      insights: [...prevState.insights, newInsight]
    }));
  }

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.insights.map((insight) => (
            <InsightCard title={insight.title} date={insight.date} description={insight.description} showModal={insight.showModal ? true : false} />
          ))}
        </Row>
        <Row>
          <Col md="3">
            <Card className="card-doc">
              <CardHeader>
                <CardTitle tag="h4" style={{color: "gray"}}>New Insight</CardTitle>
              </CardHeader>
              <CardBody>
                <div align="center">
                  <Button
                    className="btn-round btn-icon"
                    color="success"
                    id="newInsightButton"
                    title="newInsightButton"
                    type="button"
                    onClick={this.createNewInsight}
                  >
                    <i className="nc-icon nc-simple-add" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
