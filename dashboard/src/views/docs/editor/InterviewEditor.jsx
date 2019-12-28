import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
// import { createEditorStateWithText } from 'draft-js-plugins-editor';
import { Badge, Col, Input, Row } from 'reactstrap';

const text = "Book 2 tickets from Seattle to Cairo #hashtag @handle";

const tags = [
  {
    id: '1',
    name: 'positive',
    color: 'primary',
    taggedText: 'loved'
  },
  {
    id: '2',
    name: 'pain points',
    color: 'danger',
    taggedText: 'hated'
  },
  {
    id: '3',
    name: 'login',
    color: 'default',
    taggedText: 'login'
  }
]

const taggedText = [
  {
    startIndex: 5,
    endIndex: 6,
    text: "2",
    data: {
      option: { ...tags[0] },
      text: "2",
      displayName: tags[0].name,
      original: tags[0]
    }
  },
  {
    startIndex: 20,
    endIndex: 27,
    text: "Seattle",
    data: {
      option: { ...tags[1] },
      text: "Seattle",
      displayName: tags[1].name,
      original: tags[1]
    }
  },
  {
    startIndex: 31,
    endIndex: 36,
    text: "Cairo",
    data: {
      option: { ...tags[2] },
      text: "Cairo",
      displayName: tags[2].name,
      original: tags[2]
    }
  }
]

class InterviewEditor extends Component {
  constructor() {
    super();

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
      {
        strategy: hashtagStrategy,
        component: HashtagSpan,
      },
    ]);

    this.state = {
      text: text,
      editorState: EditorState.createEmpty(compositeDecorator),
      tags: [...tags],
      taggedText: [...taggedText],
      isNewEntityVisible: false,
      newEntityName: ''
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => console.log(this.state.editorState.toJS());
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

  // handleTextChange(event) {
  //   this.setState({
  //     text: event.target.value
  //   });
  //   console.log('text:', this.state.text);
  // }

  onChangetaggedText= (taggedText: models.ILabel<any>[]) => {
    this.setState({
      taggedText
    })
  }

  onClickReset = () => {
    this.setState({
      tags,
      taggedText,
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
    return (
      <div>
        <Row>
          <Col>
            <Editor
              name="text"
              id="text"
              value={this.state.text}
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Interview text"
              ref="editor"
              // ref={(element) => { this.editor = element; }}
            />
          </Col>
          <Col>
            {this.state.tags.map((entity, key) => (
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

function generateRegexs() {
  tags.forEach(tag => {
    console.log(tag)

    var taggedTextArray = [];
    // const taggedText = text.taggedText;
    //
    // taggedText.forEach(text => {
    //   console.log(text)
    //   taggedTextArray.concat(text);
    // })
    // console.log(taggedTextArray)
  });
}

// var entitiesToHighlight = Array.from(tags.values().text);
var arr = ["one", "two", "three"]
const HANDLE_REGEX = new RegExp("(?:[\\s]|^)(" + arr.join("|") + ")(?=[\\s]|$)", 'gi')

// const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
  console.log('handleStrategy called');
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  console.log('hashtagStrategy called');
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
    <span
      style={styles.handle}
    >
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span
      style={styles.hashtag}
    >
      {props.children}
    </span>
  );
};

const styles = {
  editor: {
    cursor: 'text',
  },
  handle: {
    color: 'rgba(98, 177, 254, 1.0)',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)',
  },
};

export default InterviewEditor;
