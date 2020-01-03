import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardHeader, CardBody, CardTitle, Col } from "reactstrap";
import Snip from "./Snip.jsx";

import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  height:
  display: flex;
  flex-directional: column;
`;

const Title = styled.div`
  padding: 8px;
  background-color: white;
`;

const SnipList = styled.div`
  padding: 8px;
  background-color: white;
  flex-grow: 1;
  min-height: 100px;
`;

export default class Category extends React.Component {
  render() {
    return (
      <Col style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Card className="card-doc" style={{ width: "25em", borderWidth: "2px" }}>
          <CardHeader>
            <CardTitle tag="h4">{this.props.category.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <Droppable droppableId={this.props.category.id}>
              {provided => (
                <SnipList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.snips.map((snip, index) => (
                    <Snip key={snip.id} snip={snip} index={index} />
                  ))}
                  {provided.placeholder}
                </SnipList>
              )}
            </Droppable>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
