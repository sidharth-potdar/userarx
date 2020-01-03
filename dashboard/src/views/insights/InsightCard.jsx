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

import InsightSelectTable from "./InsightSelectTable.jsx";

export default class InsightCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "Users don't know how to login.",
      date: "12/34/69",
      text: "They're dumb as hell.",
      showModal: false,
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

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <Col md="3">
        <Card className="card-doc" tag="a" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">{this.props.description}</CardTitle>
            <h5 className="card-category">{this.state.date}</h5>
          </CardHeader>
        </Card>

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">{this.props.description}</h5>
          </div>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={(e) => {this.handleDescriptionChange(e)}}
                  />
                  <br/>
                  <Input
                    type="textarea"
                    name="date"
                    id="date"
                    value={this.state.date}
                    placeholder="Date"
                    onChange={(e) => {this.handleDateChange(e)}}
                  />
                  <br/>
                  <Input
                    type="textarea"
                    name="Text"
                    id="Text"
                    value={this.state.text}
                    placeholder="Text"
                    onChange={(e) => {this.handleTextChange(e)}}
                  />
                </FormGroup>
              </Col>
            </Row>
            <InsightSelectTable />
          </ModalBody>
        </Modal>
      </Col>
    )
  }
}
