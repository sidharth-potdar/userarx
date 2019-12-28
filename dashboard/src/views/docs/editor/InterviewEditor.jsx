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
    snippets: [1],
  },
  {
    id: '2',
    name: 'pain points',
    color: 'danger',
    snippets: [2],
  },
  {
    id: '3',
    name: 'login',
    color: 'default',
    snippets: [3],
  }
]

const snippets = [
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
      snippets: [...snippets],
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

  onChangeSnippets= (snippets: models.ILabel<any>[]) => {
    this.setState({
      snippets
    })
  }

  onClickReset = () => {
    this.setState({
      tags,
      snippets,
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

    var snippetsArray = [];
    // const snippets = text.snippets;
    //
    // snippets.forEach(text => {
    //   console.log(text)
    //   snippets.concat(text);
    // })
    // console.log(snippetsArray)
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
