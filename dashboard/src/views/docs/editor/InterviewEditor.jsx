import React, { Component } from 'react';
import {
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
// import { createEditorStateWithText } from 'draft-js-plugins-editor';
import { Badge, Button, Col, Input, Row } from 'reactstrap';
import { uuid } from 'uuidv4';
import { randomColor } from 'randomcolor';
import './editor.css';
import TagsInput from "react-tagsinput";
import { BlockPicker } from 'react-color';
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../../graphql/queries'

const text = "Book 2 tickets from Seattle to Cairo";

const tags = [
  {
    id: '1',
    name: 'positive',
    color: '#a1db13',
  },
  {
    id: '2',
    name: 'pain points',
    color: '#ff0000',
  },
  {
    id: '3',
    name: 'login',
    color: '#d5d5d5',
  }
]

const snips = [
  {
    id: '1',
    text: "loved",
    tag: "1"
  },
  {
    id: '2',
    text: "hated",
    tag: "2"
  },
  {
    id: '3',
    text: "login",
    tag: "3"
  }
]

class InterviewEditor extends Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: findTagEntities,
        component: TagSpan,
      },
      {
        strategy: tagStrategy,
        component: TagSpan,
      },
    ]);

    this.state = {
      text: text,
      editorState: EditorState.createEmpty(compositeDecorator),
      tags: [...tags],
      snips: [...snips],
      isNewEntityVisible: false,
      newEntityName: '',
      showNewTagInput: false,
      tagName: '',
      tagColor: '',
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState});
      generateRegexs();
    }
    this.logEditorState = () => console.log(this.state.editorState.toJS());

    this.promptForTag = this.promptForTag.bind(this);
    this.onTagChange = (e) => this.setState({tagName: e.target.value});
    this.confirmTag = this.confirmTag.bind(this);
    this.onTagInputKeyDown = this.onTagInputKeyDown.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  promptForTag(e) {
    // e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithTagAtBeginning = contentState.getBlockForKey(startKey);
      const tagKey = blockWithTagAtBeginning.getEntityAt(startOffset);

      let tag = '';
      if (tagKey) {
        const tagInstance = contentState.getEntity(tagKey);
        tag = tagInstance.getData().tag;
      }

      this.setState({
        showNewTagInput: true,
        tagName: tag,
      });
    }
  }

  confirmTag() {
    // e.preventDefault();
    const {editorState, tagName} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'TAG',
      'MUTABLE',
      {tag: tagName}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    this.setState(prevState => {
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();
      var currentContentBlock = currentContent.getBlockForKey(anchorKey);
      var start = selectionState.getStartOffset();
      var end = selectionState.getEndOffset();
      var selectedText = currentContentBlock.getText().slice(start, end);

      const newTag = {
        id: uuid(),
        name: prevState.tagName,
        color: prevState.tagColor,
        snip: [selectedText],
      }
      const tags = [...prevState.tags, newTag];

      const newSnip = {
        id: uuid(),
        startIndex: start,
        endIndex: end,
        text: selectedText,
        tag: prevState.tagName,
      }
      const snips = [...prevState.snips, newSnip];

      sessionStorage.setItem("tags", JSON.stringify(tags));
      sessionStorage.setItem("snips", snips);

      return {
        tags: tags,
        snips: snips,
        tagName: '',
        tagColor: '',
      }
    });

    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showNewTagInput: false,
      tagName: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  onTagInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmTag(e);
    }
  }

  onClickReset = () => {
    this.setState({
      tags,
      snips,
      readOnly: false
    })
  }

  async queryForTags() {
    try {
      const response = await API.graphql(graphqlOperation(queries.getTags,
        {
          pk: "d6a21110-08ad-4d60-b102-71d59e6c71e7",
          sk: "tag"
        }
      ))
      console.log(response.data.getTags)
      this.setState({
        tags: response.data.getTags,
      })
    }
    catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    this.queryForTags();
    sessionStorage.setItem("tags", this.state.tags);
    sessionStorage.setItem("snips", this.state.snips);
    generateRegexs();
    console.log(this.state.tags);
  }

  handleColorInput = (color, event) => {
    console.log(color);
    this.setState({
      background: color.hex,
      tagColor: color.hex
    })
  };

  render() {
    let tagInput;
    if (this.state.showNewTagInput) {
      tagInput =
        <div style={styles.tagInputContainer}>
          <input
            onChange={this.onTagChange}
            ref="tag"
            style={styles.tagInput}
            type="text"
            value={this.state.tagName}
            onKeyDown={this.onTagInputKeyDown}
          />
          <BlockPicker
            color={ this.state.tagColor }
            style={{ marginTop: '10px' }}
            triangle="hide"
            onChange={this.handleColorInput}
          />
          <Button onClick={this.confirmTag}>
            Add
          </Button>
        </div>;
    }
    return (
      <div>
        <Row>
          <Col>
            <strong> Interview Transcript </strong>
            <div>
              <Button
                className="btn btn-wd btn-fill btn-magnify"
                onMouseDown={this.promptForTag}
              >
                <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                </span>
                New Tag
              </Button>
              {tagInput}
            </div>
            <Editor
              name="text"
              id="text"
              value={this.state.text}
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Write your notes about the user's feedback here"
              ref="editor"
              // ref={(element) => { this.editor = element; }}
            />
          </Col>
          <Col>
            <strong> Tags </strong>
            <h2/>
            <div style={{ paddingTop: '11px' }}>
            {this.state.tags.map((tag, key) => (
              <Badge key={key} style={{ backgroundColor: `${tag.color}` }} pill>
                {tag.name}
              </Badge>
            ))}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function generateRegexs() {
  var snipsArray = [];

  snips.forEach(snip => {
    snipsArray.push(snip.text);
    var snipsTag = snip.tag;
  });

  return snipsArray
}

const TAG_REGEX = new RegExp("(?:[\\s]|^)(" + generateRegexs().join("|") + ")(?=[\\s]|$)", 'gi')

function tagStrategy(contentBlock, callback, contentState) {
  findWithRegex(TAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findTagEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'TAG'
      );
    },
    callback
  );
}

const TagSpan = (props) => {
  return (
    <span
      id={uuid()}
      style={styles.tag}
      style={{ color: GetColor(props.decoratedText) }}
    >
      {props.children}
    </span>
  );
};

function GetColor(snip) {
  if (snip != undefined && snip != null) {
    var matchedSnip = snips[snips.findIndex(x => x.text === snip.trim())]
    if (matchedSnip != undefined && matchedSnip != null) {
      var tagID = matchedSnip.tag

      if (tagID != undefined && tagID != null) {
        var color = tags[tags.findIndex(x => x.id === tagID)].color
      }
      else {
        var color = "green"
      }
    } else {
      var color = "yellow"
    }
  } else {
    var color = "red"
  }

  return color;
}

const styles = {
  editor: {
    cursor: 'text',
    borderWidth: '1px',
  },
  tag: {
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  tagInputContainer: {
    marginBottom: 10,
  },
  tagInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
};

export default InterviewEditor;
