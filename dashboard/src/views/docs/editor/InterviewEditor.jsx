import React, { Component } from 'react';
// DRAFT JS
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
// DRAFT JS INLINE TOOLBAR
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import editorStyles from './editorStyles.css';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// import '../../../../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css';
// DRAFT JS INLINE HIGHLIGHT
import { Badge, Col, Input, Row } from 'reactstrap';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles }
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text = "Book 2 tickets from Seattle to Cairo";

const entities = [
  {
    id: '1',
    name: 'positive',
    color: 'primary'
  },
  {
    id: '2',
    name: 'pain points',
    color: 'danger'
  },
  {
    id: '3',
    name: 'login',
    color: 'default'
  }
]

const labeledEntities = [
  {
    startIndex: 5,
    endIndex: 6,
    data: {
      option: { ...entities[0] },
      text: "2",
      displayName: entities[0].name,
      original: entities[0]
    }
  },
  {
    startIndex: 20,
    endIndex: 27,
    data: {
      option: { ...entities[1] },
      text: "Seattle",
      displayName: entities[1].name,
      original: entities[1]
    }
  },
  {
    startIndex: 31,
    endIndex: 36,
    data: {
      option: { ...entities[2] },
      text: "Cairo",
      displayName: entities[2].name,
      original: entities[2]
    }
  }
]


class InterviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: text,
      editorState: createEditorStateWithText(text),
      entities: [...entities],
      labeledEntities: [...labeledEntities],
      isNewEntityVisible: false,
      newEntityName: ''
    };
    // this.handleTextChange = this.handleTextChange.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.focus = this.focus.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log('editorState:', this.state.editorState);
  };

  // focus = () => {
  //   this.editor.focus();
  // };

  // handleTextChange(event) {
  //   this.setState({
  //     text: event.target.value
  //   });
  //   console.log('text:', this.state.text);
  // }

  onChangeLabeledEntities = (labeledEntities: models.ILabel<any>[]) => {
    this.setState({
      labeledEntities
    })
  }

  onClickReset = () => {
    this.setState({
      entities,
      labeledEntities,
      readOnly: false
    })
  }

  onClickNewEntity = () => {
    console.log(`onClickNewEntity`)
    this.setState({
      isNewEntityVisible: true
    })
  }

  onClickSubmitNewEntity = () => {
    const newEntity = {
      id: new Date().toJSON(),
      name: this.state.newEntityName,
      type: 'string'
    }

    this.setState(prevState => ({
      entities: [...prevState.entities, newEntity],
      newEntityName: '',
      isNewEntityVisible: false
    }))
  }

  onChangeEntityName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newEntityName: event.target.value
    })
  }

  // componentDidMount() {
  //   this.focus();
  // }



  render() {
    return (
      <div>
        <Row>
          <Col>
            <Editor
              name="text"
              id="text"
              value={this.state.text}
              placeholder="Interview text"
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={(element) => { this.editor = element; }}
            />
          </Col>
          <Col>
            {this.state.entities.map((entity, key) => (
              <Badge color={entity.color} pill>
                {entity.name}
              </Badge>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

export default InterviewEditor;
