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

import UserDocCard from "views/docs/UserDocCard.jsx";
import Editor from "views/docs/Editor.jsx"

class Docs extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <UserDocCard name="Billy Bob - Session 1" date="10/11/12"
              description = "Testing the onboarding process with a developer"
            />

            <UserDocCard name="Meghna Dash - Session 2" date="11/12/19"
              description = "Exploring the UI with a not developer"
            />

            <UserDocCard name="Test User - Session 1" date="3/23/2019" description="Testing out user card" />
          </Row>

          <Row>
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
                      id="tooltip-new"
                      title=""
                      type="button"
                    >
                      <i className="nc-icon nc-simple-add" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip-new"
                    >
                      Create new user document
                    </UncontrolledTooltip>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
  }
}

export default Docs;
