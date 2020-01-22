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
  Form,
  Label,
  FormGroup,
  Modal,
  ModalBody,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import SessionCard from "views/sessions/SessionCard.jsx";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

class Sessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewSessionModal: false,
      newSessionName: "",
      newSessionDate: "",
      newSessionDescription: "",
      sessions: [],
    }
  }

  toggleNewSessionModal = () => {
    this.setState({
      showNewSessionModal: !this.state.showNewSessionModal
    });
  }

  submitNewSession(e) {
    e.preventDefault();
    console.log(this.state.newSessionName);
    console.log(this.state.newSessionDate);
    console.log(this.state.newSessionDescription);

    const newState = {
      name: this.state.newSessionName,
      date: this.state.newSessionDate,
      description: this.state.newSessionDescription,
    }

    this.setState(prevState => ({
      newSessionName: "",
      newSessionDate: "",
      newSessionDescription: "",
      sessions: [...prevState.sessions, newState]
    }));

    this.toggleNewSessionModal();
  }

  handleNewSessionChange = async (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  async queryForSessions() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getSessions,
        {
          pk: sessionStorage.getItem("projectID"),
          sk: "session"
        }
      ))
      this.setState({
        sessions: response.data.getSessions,
      })
      sessionStorage.setItem("sessions", JSON.stringify(this.state.sessions));

    }
    catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    if(sessionStorage.getItem("projectID") != null && sessionStorage.getItem("projectID") != undefined) {
      this.queryForSessions();
    }
    else {
      setTimeout(() => {
        this.queryForSessions();
      }, 1000);
    }
  }

  render() {
    return (
      <div className="content">
        <Row>
          {this.state.sessions.map((session) => (
            <SessionCard
              name={session.name}
              date={session.date}
              description={session.description}
              sessionID={session.sk.replace("session-", "")}
            />
          ))}
          <Col md="3">
            <Card className="card-doc">
              <CardHeader>
                <CardTitle tag="h4" style={{color: "gray"}}>New User Document</CardTitle>
              </CardHeader>
              <CardBody>
                <div align="center">
                  <Button
                    className="btn-round btn-icon"
                    color="success"
                    id="newSessionButton"
                    title="newSessionButton"
                    type="button"
                    onClick={this.toggleNewSessionModal}
                  >
                    <i className="nc-icon nc-simple-add" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal style={{maxWidth: '1600px', width: '50%'}} isOpen={this.state.showNewSessionModal} toggle={this.toggleNewSessionModal} size="lg">
          <div className="modal-header justify-content-right">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleNewSessionModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Create new session</h5>
          </div>
          <ModalBody>
            <Form onSubmit={(e) => this.submitNewSession(e)}>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="newSessionName"
                    id="newSessionName"
                    value={this.state.newSessionName}
                    placeholder="Session Name"
                    onChange={(e) => {this.handleNewSessionChange(e)}}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="newSessionDate"
                    id="newSessionDate"
                    value={this.state.newSessionDate}
                    placeholder="Session Date"
                    onChange={(e) => {this.handleNewSessionChange(e)}}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="newSessionDescription"
                    id="newSessionDescription"
                    value={this.state.newSessionDescription}
                    placeholder="Session Description"
                    onChange={(e) => {this.handleNewSessionChange(e)}}
                  />
                </FormGroup>
              </Col>
              <div align="center">
                <Button color="info">
                  Submit
                </Button>
              </div>
            </Form>
          </ModalBody>

        </Modal>

      </div>
    );
  }
}

export default Sessions;
