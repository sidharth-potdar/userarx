import React, { Component } from 'react';
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Col,
  Row
} from "reactstrap";

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

var uuid4 = require('uuid/v4');
var randomColor = require('randomcolor');
export default class Prioritization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1000,
      height: 800,
      radius: 24,
      minX: 100,
      maxX: 1000,
      minY: 25,
      maxY: 700,
      insights: []
    }
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
    this.draw();
  }

  selectInsight = (insight) => {
    console.log(insight);
    var insights = this.state.insights;
    this.state.insights.forEach(check);
    this.setState({
      insights: insights
    });

    function check(value, index, array) {
      if (value.id === insight.id) {
        insights[index] = {
          ...value,
          selected: true,
        }
      } else {
        insights[index] = {
          ...value,
          selected: false,
        }
      }
    }
  }

  draw = () => {
    const width = this.state.width;
    const height = this.state.height;
    const minX = this.state.minX;
    const maxX = this.state.maxX;
    const minY = this.state.minY;
    const maxY = this.state.maxY;
    const insights = this.state.insights;

    const svg = d3.select(this.refs.canvas)
      .append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      // .style("border", "1px solid black");

    // const circles = d3.range(20).map(i => ({
    //   x: Math.random() * (this.state.maxX - this.state.radius * 2) + this.state.radius + this.state.minX,
    //   y: Math.random() * (this.state.maxY - this.state.radius * 2) + this.state.radius + this.state.minY,
    //   id: uuid4()
    // }));

    let voronoi = Delaunay
      .from(this.state.insights, d => d.x, d => d.y, d => d.sk)
      .voronoi([0, 0, this.state.width, this.state.height]);

    const cell = svg.append("defs")
      .selectAll("clipPath")
      .data(this.state.insights)
      .join("clipPath")
        .attr("id", d => d.sk)
      .append("path")
        .attr("d", (d, i) => voronoi.renderCell(i));

    const circle = svg.append("g")
      .selectAll("g")
      .data(this.state.insights)
      .join("g")
        .attr("clip-path", d => d.sk)
      .append("g")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .call(g => g.append("circle")
          .attr("r", this.state.radius)
          .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
          .attr("fill-opacity", 0.2))
        .call(d3.drag()
          .on("start", d => (circle.filter(p => p === d).raise().attr("stroke", "black"), this.selectInsight(d), circle.filter(p => p !== d).raise().attr("stroke", null)))
          .on("drag", d => (d.x = d3.event.x, d.y = d3.event.y))
          // .on("end", d => circle.filter(p => p === d).attr("stroke", null))
          .on("start.update drag.update end.update", update));

    var yscale = d3.scaleLinear()
      .domain([0, this.state.maxY-this.state.minY])
      .range([this.state.maxY-this.state.minY, 0]);
    var y_axis = d3.axisLeft()
      .scale(yscale)
      .tickValues([]);

    var xscale = d3.scaleLinear()
      .domain([this.state.minX, this.state.maxX])
      .range([this.state.maxX - this.state.minX, 0]);
    var x_axis = d3.axisBottom()
      .scale(xscale)
      .tickValues([]);

    svg.append("g")
      .attr("transform", "translate("+this.state.minX+", "+this.state.minY+")")
      .call(y_axis);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (this.state.minX-10) +","+(this.state.height/2 - 50)+")rotate(-90)")
      .text("Value");

    svg.append("g")
      .attr("transform", "translate("+this.state.minX+", "+this.state.maxY+")")
      .call(x_axis);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (this.state.width/2) +","+(730)+")")
      .text("Effort");

    function update() {
      voronoi = Delaunay.from(insights, d => d.x, d => d.y).voronoi([0, 0, width, height]);
      circle.attr("transform", d => (
        `translate(${d.x >= minX && d.x <= maxX ? d.x : 10},${d.y >= minY && d.y <= maxY ? d.y : 10})`
      ))
      cell.attr("d", (d, i) => voronoi.renderCell(i));
    }
  }

  render() {
    return (
      <Row>
        <Col lg="2" md="2">
          <Card className="card-doc" style={{ marginTop: "75px", marginLeft: "40px", width: "200px" }}>
            <CardHeader>
              <CardTitle tag="h4">
                Insights
              </CardTitle>
            </CardHeader>
            <CardBody>
              {this.state.insights.map((insight, key) => (
                <Card
                  className="card-doc"
                  style={{
                    color: insight.selected ? "black" : "gray",
                    padding: "10px",
                    border: insight.selected ? "1px solid lightgrey" : "none",
                    backgroundColor: randomColor({ luminosity: 'dark', format: 'rgba', alpha: 0.1 }),
                  }}
                >
                  {insight.selected ?
                    <CardText>
                      {insight.text}
                    </CardText> :
                    <CardText>
                      {insight.text}
                    </CardText>
                  }
                </Card>
              ))}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card style={{ marginTop: "75px", marginLeft: "40px", height: this.state.height+"px", width: this.state.width+"px"}}>
            <div align="center" ref="canvas"></div>
          </Card>
        </Col>
      </Row>
    )
  }
}
