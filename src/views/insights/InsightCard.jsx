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

export default class InsightCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      date: this.props.date,
      description: this.props.description,
      showModal: this.props.showModal,
      isOpen: false,
      selectedSnips: [
        {
          text: "Yeah, aight, bust down, Thotiana",
          tag: "bust",
          session: "Billy Bob Session 1",
          date: "12/34/69"
        },
        {
          text: "Bust down, Thotiana (bust down, Thotiana)",
          tag: "down",
          session: "Meghna Dash Session 2",
          date: "1/1/13"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
      ],
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

  toggleTable = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Col md="3">
        <Card className="card-doc" tag="a" onClick={this.toggleModal} style={{ cursor: "pointer" }}>
          <CardHeader>
            <CardTitle tag="h4">{this.state.title}</CardTitle>
            <h5 className="card-category">{this.state.date}</h5>
          </CardHeader>
        </Card>

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">{this.state.title}</h5>
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
            {this.state.selectedSnips.map((snip) => (
              <Row>
                <Card className="card-doc" style={{ width: "55em", borderColor: "#8a8988", borderWidth: "20px", padding: "15px" }}>
                  <strong>{snip.session}</strong>
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
