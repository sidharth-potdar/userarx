import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

export default class InsightSelectTable extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelect = (e, snip) => {
    console.log(snip);
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th className="text-center"></th>
                  <th className="text-left">Snip</th>
                  <th className="text-left">Tag</th>
                  <th className="text-left">Session</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                {JSON.parse(sessionStorage.getItem("snips")).map((snip, key) => (
                  <tr>
                    <td className="text-center">
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" onChange={(e) => this.handleSelect(e, snip)} />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>{snip.text}</td>
                    <td>{snip.tag_text}</td>
                    <td>{snip.session_name}</td>
                    <td>{snip.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}
