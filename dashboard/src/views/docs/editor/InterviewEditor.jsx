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

const text = "Book 2 tickets from Seattle to Cairo #hashtag @handle";

const tags = [
  {
    id: '1',
    name: 'positive',
    color: 'primary',
    snips: [1],
  },
  {
    id: '2',
    name: 'pain points',
    color: 'danger',
    snips: [2],
  },
  {
    id: '3',
    name: 'login',
    color: 'default',
    snips: [3],
  }
]

const snips = [
  {
    id: '1',
    startIndex: 0,
    endIndex: 4,
    text: "loved",
    tag: "positive"
  },
  {
    id: '2',
    startIndex: 6,
    endIndex: 11,
    text: "hated",
    tag: "pain points"
  },
  {
    id: '3',
    startIndex: 13,
    endIndex: 18,
    text: "login",
    tag: "login"
  }
]

class InterviewEditor extends Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
      {
        strategy: hashtagStrategy,
        component: HashtagSpan,
      },
      {
        strategy: findTagEntities,
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
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logEditorState = () => console.log(this.state.editorState.toJS());

    this.promptForTag = this.promptForTag.bind(this);
    this.onTagChange = (e) => this.setState({tagName: e.target.value});
    this.confirmTag = this.confirmTag.bind(this);
    this.onTagInputKeyDown = this.onTagInputKeyDown.bind(this);
    this.logState = this.logState.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log('editorState:', this.state.editorState);
  };

  focus = () => {
    this.editor.focus();
  };

  promptForTag(e) {
    e.preventDefault();
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

  confirmTag(e) {
    e.preventDefault();
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
        color: 'primary',
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

      return {
        tags,
        snips,
        tagName: '',
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
      this._confirmTag(e);
    }
  }

  logState(e) {
    console.log(this.state);
    // e.preventDefault();
    // const {editorState} = this.state;
    // const selection = editorState.getSelection();
    // if (!selection.isCollapsed()) {
    //   this.setState({
    //     editorState: RichUtils.toggleLink(editorState, selection, null),
    //   });
    // }
  }


  // handleTextChange(event) {
  //   this.setState({
  //     text: event.target.value
  //   });
  //   console.log('text:', this.state.text);
  // }

  onChangeSnips= (snips: models.ILabel<any>[]) => {
    this.setState({
      snips
    })
  }

  onClickReset = () => {
    this.setState({
      tags,
      snips,
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
      tags: [...prevState.tags, newEntity],
      newEntityName: '',
      isNewEntityVisible: false
    }))
  }

  onChangeEntityName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newEntityName: event.target.value
    })
  }

  componentDidMount() {
    generateRegexs();
  }

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
          <Button
            onMouseDown={this.confirmTag}
          >
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
                class="btn btn-wd btn-warning btn-fill btn-magnify"
                onMouseDown={this.promptForTag}
                style={{marginRight: 10}}>
                <span className="btn-label" style={{marginRight: 5}}>
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

            <div style={{ paddingTop: '11px' }}>
            {this.state.tags.map((tag, key) => (
              <Badge color={tag.color} pill>
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
  tags.forEach(tag => {
    console.log(tag)

    var snipsArray = [];
    // const snips = text.snips;
    //
    // snips.forEach(text => {
    //   console.log(text)
    //   snips.concat(text);
    // })
    // console.log(snipsArray)
  });
}

// var entitiesToHighlight = Array.from(tags.values().text);
var arr = ["one", "two", "three"]
const HANDLE_REGEX = new RegExp("(?:[\\s]|^)(" + arr.join("|") + ")(?=[\\s]|$)", 'gi')

// const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
  // console.log('handleStrategy called');
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  // console.log('hashtagStrategy called');
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

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (
    <span style={styles.handle}>
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span style={styles.hashtag}>
      {props.children}
    </span>
  );
};

const TagSpan = (props) => {
  return (
    <span style={styles.tag}>
      {props.children}
    </span>
  );
};

const styles = {
  editor: {
    cursor: 'text',
    borderWidth: '1px',

  },
  tag: {
    color: 'rgba(98, 177, 254, 1.0)',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)',
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
