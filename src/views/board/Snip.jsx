import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge, Card } from "reactstrap";

import styled from "styled-components";

const snipColors = ['#ddecf4', '#fae1eb', '#fce6e8', '#dde6df', '#dcdaec']

const Container = styled.div`
  border: 1px lightgrey;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  min-height: 70px;
  overflow: auto;
  background-color: ${(props) => (snipColors[props.index % snipColors.length])};
  box-shadow: 1px 1px 3px lightgrey;
`;

export default class Snip extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.snip.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            index={this.props.index}
            // style={{ backgroundColor: `${snipColors[this.props.index % snipColors.length]}` }}
          >
            <small>{this.props.snip.text}</small>
            <br />
            <Badge color="primary" pill>
              login
            </Badge>
          </Container>
        )}
      </Draggable>
    );
  }
}
