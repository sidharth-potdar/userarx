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
  Collapse,
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
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

import InsightSelectTable from "./InsightSelectTable.jsx";

import Moment from 'react-moment';
import 'moment-timezone';

export default class InsightCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      date: this.props.date,
      description: this.props.description,
      showModal: this.props.showModal,
      isOpen: false,
      matchedSnips: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleDateChange(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  getMatchedSnips = () => {
    const matchedSnipsArray = [];
    var snips = JSON.parse(sessionStorage.getItem('snips'));

    if(this.props.selectedSnips != null && this.props.selectedSnips != undefined) {
      this.props.selectedSnips.forEach((selectedSnip, i) => {
        console.log("selectedSnip", selectedSnip);

        if(snips[snips.findIndex(x => x.sk.replace("snip-", "") === selectedSnip)] != null && snips[snips.findIndex(x => x.sk.replace("snip-", "") === selectedSnip)] != undefined) {
          matchedSnipsArray.push(snips[snips.findIndex(x => x.sk.replace("snip-", "") === selectedSnip)]);
        }
      });
      this.setState({
        matchedSnips: matchedSnipsArray
      })
      console.log("matchedSnipsArray", matchedSnipsArray)
    }
  }

  toggleTable = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.getMatchedSnips();
  }

  render() {
    return (
      <Col md="3">
        <Card className="card-doc" tag="a" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">
              {this.state.title}
            </CardTitle>
            <h5 className="card-category">
              <Moment unix>
                {this.state.date}
              </Moment>
            </h5>
          </CardHeader>
        </Card>

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">
              {this.state.title}
            </h5>
          </div>
          <ModalBody>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.title}
                    placeholder="Title"
                    onChange={(e) => {this.handleTitleChange(e)}}
                  />
                  <br/>
                </Col>
                <Col>
                  <Input
                    type="textarea"
                    name="date"
                    id="date"
                    value={this.state.date}
                    placeholder="Date"
                    onChange={(e) => {this.handleDateChange(e)}}
                  />
                  <br/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="text"
                    id="text"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={(e) => {this.handleDescriptionChange(e)}}
                  />
                </Col>
              </Row>
            </FormGroup>
            {this.state.matchedSnips.map((snip) => (
              <Row>
                <Card className="card-doc" style={{ width: "55em", borderColor: "#8a8988", borderWidth: "20px", padding: "15px" }}>
                  <strong>{snip.session_name}</strong>
                  <CardText>{snip.text}</CardText>
                </Card>
              </Row>
            ))}
            <div align="center">
              <Button color="info" onClick={() => this.toggleTable()}>
                Select evidence
              </Button>
            </div>
            <Collapse isOpen={this.state.isOpen}>
              <InsightSelectTable />
            </Collapse>
          </ModalBody>
        </Modal>
      </Col>
    )
  }
}
