import React, { Component } from 'react';
// DRAFT JS
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// DRAFT JS INLINE TOOLBAR
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import editorStyles from './editorStyles.css';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// import '../../../../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles }
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text = 'The Kick Six (also known as Kick Bama Kick) was the final play of the 78th Iron Bowl college football game played on November 30, 2013 at Jordan–Hare Stadium in Auburn, Alabama.';

class InterviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(text),
    };
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
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
