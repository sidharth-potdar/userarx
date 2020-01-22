import React, { Component } from 'react';
import {
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// import CreatableSelect from 'react-select/creatable';
import { Creatable } from 'react-select'

import { Badge, Button, Col, Input, Row, CardTitle } from 'reactstrap';
import { uuid } from 'uuidv4';
import { randomColor } from 'randomcolor';
import './editor.css';
import TagsInput from "react-tagsinput";
import { BlockPicker } from 'react-color';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';

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
      editorState: EditorState.createEmpty(compositeDecorator),
      tags: this.props.tags,
      snips: this.props.snips,
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

    generateRegexs();

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

      console.log("PREV STATE", prevState)
      const newTag = {
        color: prevState.tagColor,
        name: prevState.tagName,
        pk: sessionStorage.getItem("projectID"),
        sk: "tag-" + uuid(),
        isNew: true,
      }
      const tags = [...prevState.tags, newTag];

      const newSnip = {
        pk: sessionStorage.getItem("projectID"),
        sk: "snip-" + uuid(),
        color: prevState.tagColor,
        date:  Date.now(),
        session_id: this.props.sessionID,
        session_name: this.props.name,
        tag_id: newTag.sk.replace("tag-", ""),
        tag_text: newTag.name,
        text: selectedText.trim(),
        isNew: true,
      }

      console.log("newTag", newTag);
      console.log("newSnip", newSnip);

      const snips = [...prevState.snips, newSnip];

      sessionStorage.setItem("tags", JSON.stringify(tags));
      sessionStorage.setItem("snips", JSON.stringify(snips));

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

  handleColorInput = (color, event) => {
    console.log(color);
    this.setState({
      background: color.hex,
      tagColor: color.hex
    })
  };

  putTagsInDynamo() {
    this.state.tags.forEach(async function(tag) {
      if(tag.isNew) {
        try {
          const response = await API.graphql(graphqlOperation(mutations.putTags,
            {
              pk: tag.pk,
              sk: tag.sk,
              name: tag.name,
              color: tag.color,
            }
          ))
          console.log(response.data.putTags)
        }
        catch (error) {
          console.log('error', error)
        }
      }
    })
  }

  putSnipsInDynamo() {
    this.state.snips.forEach(async function(snip) {
      if(snip.isNew) {
        try {
          const response = await API.graphql(graphqlOperation(mutations.putSnips,
            {
              pk: snip.pk,
              sk: snip.sk,
              color: snip.color,
              date: snip.date,
              session_id: snip.session_id,
              session_name: snip.session_name,
              tag_id: snip.tag_id,
              tag_text: snip.tag_text,
              text: snip.text,
            }
          ))
          console.log(response.data.putSnips)
        }
        catch (error) {
          console.log('error', error)
        }
      }
    })
  }

  componentDidMount() {
    generateRegexs();
  }

  componentWillUnmount() {
    this.putTagsInDynamo();
    this.putSnipsInDynamo();
  }

  createPreviousTagsProp = () => {
    const previousTags = [];
    this.props.allTags.forEach((tag) =>
      previousTags.push({ value: tag.sk, label: tag.name })
    )
    console.log("previousTags", previousTags);
    return previousTags;
  }

  handleTagsChange = (value) => {
    console.log('VALUE', value);
    this.setState({
      tagName: value
    })
  };

  render() {
    let tagInput;
    if (this.state.showNewTagInput) {
      tagInput =
        <div style={styles.tagInputContainer}>
          <Creatable
            isClearable
            backspaceRemovesValue
            className="react-select primary"
            classNamePrefix="react-select"
            onChange={value => this.handleTagsChange(value)}
            onCreateOption={value => this.handleTagsChange(value)}
            options={this.createPreviousTagsProp()}
            placeholder="Assign a Tag"
          />
          <BlockPicker
            color={ this.state.tagColor }
            colors={['#9DE1E2', '#B3DBF5', '#D2D1FB', '#EECAF0', '#FDC5E2', '#FDC7C8', '#EECFB2', '#D5D7A8', '#B9DEB3', '#9FE3CA']}
            style={{ marginTop: '10px' }}
            triangle="hide"
            onChange={this.handleColorInput}
          />
          <Button
            onClick={this.confirmTag}
          >
            Add
          </Button>
        </div>;
    }
    return (
      <div>
        <Row>
          <Col ld="8" md="8">
            <CardTitle>Interview Transcript</CardTitle>
            <div onClick={this.focus}>
              <Editor
                name="text"
                id="text"
                style={styles.editor}
                value={this.state.text}
                editorState={this.state.editorState}
                onChange={this.onChange}
                placeholder="Write your notes about the user's feedback here"
                ref="editor"
                // ref={(element) => { this.editor = element; }}
              />
            </div>
          </Col>
          <Col>
            <CardTitle>Tags</CardTitle>
            <div style={{ marginTop: '22px'}}>
              <Badge
                onMouseDown={this.promptForTag}
                style={{
                  color: "#2c2c2c",
                  fontSize: ".9em",
                }}
                pill
              >
                + New Tag
              </Badge>
              {tagInput}

            {this.state.tags.map((tag, key) => (
              <Badge
                key={key}
                style={{
                  backgroundColor: `${tag.color}`,
                  color: "#2c2c2c",
                  border: "none",
                  fontSize: ".9em",
                }}
                pill
              >
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
  const snips = JSON.parse(sessionStorage.getItem("snips"));

  if (snips != null && snips != undefined) {
    snips.forEach(snip => {
      snipsArray.push(snip.text);
      var snipsTag = snip.tag;
    });
  }

  // if (snips != null && snips != undefined) {
  //   Array.from(snips.children).forEach(snip => {
  //     snipsArray.push(snip.text);
  //   });
  // }

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
      style={{ backgroundColor: GetColor(JSON.parse(sessionStorage.getItem('tags')), props.decoratedText, JSON.parse(sessionStorage.getItem('snips'))) }}
    >
      {props.children}
    </span>
  );
};

function GetColor(tags, snip, snips) {
  if (snip != undefined && snip != null) {
    console.log("snip", snip)
    var matchedSnip = snips[snips.findIndex(x => x.text === snip.trim())]
    console.log("matchedSnip", matchedSnip)
    if (matchedSnip != undefined && matchedSnip != null) {
      var tagID = matchedSnip.tag_id
      console.log("tagID", tagID)
      if (tagID != undefined && tagID != null) {
        console.log(tagID)
        var color = tags[tags.findIndex(x => x.sk === "tag-" + tagID)].color
      }
    }
  }

  return color;
}

const styles = {
  editor: {
    cursor: 'text',
    borderWidth: '1px',
    fontSize: '16px'
  },
  tag: {
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  tagInputContainer: {
    marginBottom: 10,
  }
};

export default InterviewEditor;
