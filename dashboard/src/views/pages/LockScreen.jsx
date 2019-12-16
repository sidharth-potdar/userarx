import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Container,
  Col
} from "reactstrap";

class LockScreen extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("lock-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("lock-page");
  }
  render() {
    return (
      <div className="lock-page">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-lock text-center">
              <CardHeader>
                <img
                  alt="..."
                  src={require("assets/img/faces/joe-gardner-2.jpg")}
                />
              </CardHeader>
              <CardBody>
                <CardTitle tag="h4">Joe Gardner</CardTitle>
                <FormGroup>
                  <Input
                    placeholder="Enter Password.."
                    type="password"
                    autoComplete="off"
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-round"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  outline
                >
                  Unlock
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("assets/img/bg/bruno-abatti.jpg")})`
          }}
        />
      </div>
    );
  }
}

export default LockScreen;
