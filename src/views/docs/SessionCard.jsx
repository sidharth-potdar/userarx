import React, { Component } from "react";

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
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import InterviewEditor from "./editor/InterviewEditor.jsx";
import ReactDatetime from "react-datetime";
import './sessionCard.css';

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

class SessionCard extends Component {
  constructor(props) {
    super(props);
    // this.name = this.props.name;
    // this.description = this.props.description;

    this.state = {
      name: this.props.name,
      date: this.props.date,
      description: this.props.description,
      showModal: false,
      tags: []
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleDateChange(event) {
    this.setState({
      date: event.target.value
    })
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  async queryForTags() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getTags,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "tag"
        }
      ))
      console.log(response.data.getTags)
      this.setState({
        tags: response.data.getTags,
      })
      sessionStorage.setItem("tags", JSON.stringify(this.state.tags));

    }
    catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    if(sessionStorage.getItem("projectID") != null && sessionStorage.getItem("projectID") != undefined) {
      this.queryForTags();
    }
    else {
      setTimeout(() => {
        this.queryForTags();
      }, 1000);
    }
    console.log(this.state.tags);
  }


  render() {
    return (
      <Col md="3">
        <Card className="card-doc" tag="a" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">
              {this.props.name}
            </CardTitle>
            <h5 className="card-category">{this.props.date}</h5>
            <p style={{color: "gray"}}>{this.props.description}</p>
          </CardHeader>
          <CardBody>
            {this.state.tags.map((tag, key) => (
              <Badge key={key} style={{ backgroundColor: `${tag.color}` }} pill>
                {tag.name}
              </Badge>
            ))}
          </CardBody>
        </Card>
        <Modal style={{maxWidth: '1600px', width: '70%'}} isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-right">
            <Button close aria-label="Cancel">
              <span aria-hidden>&ndash;</span>
            </Button>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
            <h5>
              <Input
                type="text"
                name="name"
                className="name-input"
                id="name"
                value={this.state.name}
                placeholder="Name"
                onChange={(e) => {this.handleNameChange(e)}}
                style={{ border: 'none', textAlign: 'center', fontSize: '1.5em', marginTop: '-20px'}}
              />
            </h5>
            <ModalHeader style={{ padding: '0px', height: '0px', margin: '0px'}}/>
          <ModalBody>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={(e) => {this.handleDescriptionChange(e)}}
                  />
                </Col>
                <Col>
                  <CardTitle>Date & Time of Interview</CardTitle>
                  <ReactDatetime
                    name="date"
                    id="date"
                    value={this.state.date}
                    inputProps={{
                      className: "form-control",
                      placeholder: "Date & time of interview"
                    }}
                    onChange={(e) => {this.handleDateChange(e)}}
                  />
                </Col>
              </Row>
            </FormGroup>
            <br />
            <InterviewEditor tags={this.state.tags} />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
                Close
            </Button>
            <Button color="info">
                Save changes
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    )
  }
}

export default SessionCard;
