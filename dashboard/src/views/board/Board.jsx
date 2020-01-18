import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Row, Col, Button, UncontrolledTooltip, CardHeader, CardBody, CardTitle, Input } from "reactstrap";
import styled from "styled-components";

import Category from "./Category.jsx";

import initialData from "./initial-data.js";
var uuid4 = require('uuid/v4');

const Container = styled.div`
  display: flex;
`;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
    this.createNewCategory = this.createNewCategory.bind(this);
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.categories[source.droppableId];
    const finish = this.state.categories[destination.droppableId];

    if (start === finish) {
      const newSnipIds = Array.from(start.snipIds);
      newSnipIds.splice(source.index, 1);
      newSnipIds.splice(destination.index, 0, draggableId);

      const newCategory = {
        ...start,
        snipIds: newSnipIds
      };

      const newState = {
        ...this.state,
        categories: {
          ...this.state.categories,
          [newCategory.id]: newCategory,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one category to another
    const startSnipIds = Array.from(start.snipIds);
    startSnipIds.splice(source.index, 1);
    const newStart = {
      ...start,
      snipIds: startSnipIds,
    };

    const finishSnipIds = Array.from(finish.snipIds);
    finishSnipIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      snipIds: finishSnipIds,
    };

    const newState = {
      ...this.state,
      categories: {
        ...this.state.categories,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
    };

    this.setState(newState);
  }

  createNewCategory() {
    if (this.state.newCategoryName === "") {
      return;
    }

    const newCategory = {
      id: uuid4(),
      title: this.state.newCategoryName,
      snipIds: [],
    };

    const newState = {
      ...this.state,
      categories: {
        ...this.state.categories,
        [newCategory.id]: newCategory
      },
      categoryOrder: [...this.state.categoryOrder, newCategory.id],
      newCategoryName: "",
    };

    console.log(newState);

    this.setState(newState);
  }

  handleNewCategoryChange = (event) => {
    this.setState({
      newCategoryName: event.target.value,
    });
  }

  render() {
    return (
      <div className="content">
        <Row>
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <Container>
              {this.state.categoryOrder.map(categoryId => {
                const category = this.state.categories[categoryId];
                const snips = category.snipIds.map(snipId => this.state.snips[snipId]);

                return <Category key={category.id} category={category} snips={snips} />;
              })}
            </Container>
          </DragDropContext>
          <Col style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Card className="card-doc" style={{ width: "20em", borderWidth: "2px" }}>
              <CardHeader>
                <CardTitle tag="h4" style={{color: "gray"}}>
                  <Input
                    type="text"
                    name="newCategory"
                    id="newCategory"
                    value={this.state.newCategoryName}
                    placeholder="New Category"
                    onChange={(e) => {this.handleNewCategoryChange(e)}}
                    style={{ border: "0px solid #dddddd", fontSize: "24px" }}
                  >
                  </Input>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div align="center">
                  <Button
                    className="btn-round btn-icon"
                    color="success"
                    id="tooltip-new"
                    title=""
                    type="button"
                    onClick={this.createNewCategory}
                  >
                    <i className="nc-icon nc-simple-add" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
