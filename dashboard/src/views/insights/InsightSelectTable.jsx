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

    this.state = {
      snips: [
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
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
        {
          text: "Speed it up, then slow that shit down, on the gang (slow it down)",
          tag: "thotiana",
          session: "Squishy Circle Session 3",
          date: "2/15/98"
        },
      ]
    };
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
                {this.state.snips.map((snip, idx) => (
                  <tr>
                    <td className="text-center">
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>{snip.text}</td>
                    <td>{snip.tag}</td>
                    <td>{snip.session}</td>
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
