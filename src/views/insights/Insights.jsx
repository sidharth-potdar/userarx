import React, { Component } from 'react';
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

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

export default class Insights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      insights: [],
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

  async queryForInsights() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getInsights,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "insight"
        }
      ))
      this.setState({
        insights: response.data.getInsights,
      })
      sessionStorage.setItem("insights", JSON.stringify(this.state.insights));
      console.log("queryForInsights", response);
    }
    catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    this.queryForInsights();
  }

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.insights.map((insight) => (
            <InsightCard
              title={insight.text}
              date={insight.date}
              description={insight.description}
              selectedSnips={insight.snips}
              showModal={insight.showModal ? true : false}
            />
          ))}
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
