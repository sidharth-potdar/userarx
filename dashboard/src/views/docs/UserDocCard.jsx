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
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Editor from "views/docs/Editor.jsx";
import InterviewEditor from "./editor/InterviewEditor.jsx";

class UserDocCard extends React.Component {
  constructor(props) {
    super(props);
    // this.name = this.props.name;
    // this.description = this.props.description;

    this.state = {
      name: this.props.name,
      date: this.props.date,
      description: this.props.description,
      showModal: false,
      notesValue: "",
      tags: ["login", "menu", "navigation"]
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

  handleNotesChange(event) {
    this.setState({
      notes: event.target.value
    })
  }

  render() {
    return (
      <Col md="3">
        <Card className="card-doc">
          <CardHeader>
            <CardTitle tag="h4">{this.props.name}</CardTitle>
            <h5 className="card-category">{this.props.date}</h5>
            <p style={{color: "gray"}}>{this.props.description}</p>
          </CardHeader>
          <CardBody>
            {this.state.tags.map((tag, idx) => (
              <Badge color="default" pill>
                {tag}
              </Badge>
            ))}
            <div align="right">
              <Button
                className="btn-round btn-icon btn-icon-mini"
                color="info"
                id="tooltip42906017"
                title=""
                type="button"
                onClick={this.toggleModal}
              >
                <i className="nc-icon nc-send" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip42906017"
              >
                View Doc
              </UncontrolledTooltip>

              <Button
                className="btn-round btn-icon btn-icon-mini"
                color="danger"
                id="tooltip570363224"
                title=""
                type="button"
              >
                <i className="nc-icon nc-simple-remove" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip570363224"
              >
                Delete
              </UncontrolledTooltip>
            </div>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">{this.state.name}</h5>
          </div>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="name"
                    id="name"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={(e) => {this.handleNameChange(e)}}
                  />
                  <br/>
                  <Input
                    type="textarea"
                    name="name"
                    id="name"
                    value={this.state.date}
                    placeholder="Date"
                    onChange={(e) => {this.handleDateChange(e)}}
                  />
                  <br/>
                  <Input
                    type="textarea"
                    name="name"
                    id="name"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={(e) => {this.handleDescriptionChange(e)}}
                  />
                </FormGroup>
              </Col>
            </Row>
            <br />
            <InterviewEditor />
            <br />
            <FormGroup>
              <Input
                type="textarea"
                name="notes"
                id="notes"
                style={{
                  minHeight: "500px",
                }}
                value={this.state.notes}
                placeholder="Notes"
                onChange={(e) => {this.handleNotesChange(e)}}
              />
            </FormGroup>
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

export default UserDocCard;
