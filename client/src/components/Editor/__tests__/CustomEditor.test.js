/* eslint-env and, jest */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { Editor, EditorState, ContentState } from 'draft-js';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import CustomEditor, { Styles } from '../CustomEditor';

Enzyme.configure({ adapter: new Adapter() });

const DELAY_MS = 2000;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

describe('CustomEditor', () => {
  window.scrollTo = jest.fn();
  let props;
  let mountedEditor;
  const customEditor = (text) => {
    if (text)
      props.editorState = EditorState.createWithContent(ContentState.createFromText(text));
    if (!mountedEditor) {
      mountedEditor = mount(
        <CustomEditor {...props} />,
      );
    }
    return mountedEditor;
  };

  const shallowEditor = (text) => {
    if (text)
      props.editorState = EditorState.createWithContent(ContentState.createFromText(text));
    if (!mountedEditor) {
      mountedEditor = shallow(
        <CustomEditor {...props} />,
      );
    }
    return mountedEditor;
  };

  beforeEach(() => {
    props = {
      editorState: EditorState.createEmpty(),
      toggleBlockType: jest.fn(),
      toggleInlineStyle: jest.fn(),
      handleKeyCommand: jest.fn(),
      handleChange: jest.fn(),
      keyLogger: {
        setTimer: jest.fn(),
        setEditTotal: jest.fn(),

      },
      setRef: jest.fn(),
    };
    mountedEditor = undefined;
  });

  it('always renders a div', () => {
    const divs = customEditor().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = customEditor().find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv).toEqual(customEditor().children());
    });
  });

  it('always renders an `Editor`', () => {
    expect(customEditor().find(Editor).length).toBe(1);
  });

  describe('rendered `Editor`', () => {
    let cEditor;
    beforeEach(() => {
      cEditor = customEditor();
    });

    it('receives 16 props', () => {
      const editor = cEditor.find(Editor);
      editor.render();
      cEditor.update();
      expect(Object.keys(editor.props()).length).toBe(16);
      expect(editor.props().readOnly).toBe(false);
      expect(editor.props().spellCheck).toBe(true);
      expect(editor.props().spellCheck).toBe(true);
      expect(editor.props().editorState).toEqual(props.editorState);
      expect(editor.props().autoComplete).toBe('off');
      expect(editor.props().autoCorrect).toBe('on');
      expect(editor.prop('ariaLabel')).toBe('Segment Target Editor');
    });
  });

  describe('when `renderStyles` is true', () => {
    let editor;
    beforeEach(() => {
      editor = customEditor();
      editor.setState({ renderStyles: true });
    });

    it('renders a `Styles`', () => {
      const styles = editor.find(Styles);
      expect(styles.length).toBe(1);
    });
  });

  describe('when `renderStyles` is false', () => {
    let editor;
    beforeEach(() => {
      editor = customEditor();
      editor.setState({ renderStyles: false });
    });

    it('does not render a `Styles`', () => {
      expect(editor.find(Styles).length).toBe(0);
    });
  });

  describe('editor private functions', () => {
    let editor;
    beforeEach(() => {
      props.handleChange = spy();
      props.toggleInlineStyle = jest.fn();
      editor = customEditor('Some sample text');
    });

    it('has a key binding function for shortcuts', () => {
      expect(editor.instance().myKeyBindingFn({ ctrlKey: true, keyCode: 13 })).toEqual('next-segment');
      expect(typeof editor.instance().myKeyBindingFn({ ctrlKey: false, keyCode: 111 })).toEqual('object');
    });

    it('has a function to move to the next word', () => {
      editor.instance().nextWord();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to move to the previous word', () => {
      editor.instance().previousWord();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to select the current word', () => {
      editor.instance().selectWord();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to copy the current word', () => {
      editor.instance().copyWord();
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a function to cut the current word', () => {
      editor.instance().cutWord();
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a function to paste a word', () => {
      editor.instance().pasteWord();
      expect(props.handleChange.callCount).toBe(1);
    });

    it('has a function to delete a word', () => {
      editor.instance().delete();
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a function to insert a word', () => {
      editor.instance().insertWord();
      expect(props.handleChange.callCount).toBe(1);
    });

    it('has a function to uppercase a word', () => {
      editor.instance().upperCase();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to lowercase a word', () => {
      editor.instance().lowerCase();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to make a word bold', () => {
      editor.instance().bold();
      expect(editor.props().toggleInlineStyle.mock.calls.length).toBe(1);
      expect(editor.props().toggleInlineStyle.mock.calls[0][0]).toBe('BOLD');
    });

    it('has a function to make a word italic', () => {
      editor.instance().italic();
      expect(editor.props().toggleInlineStyle.mock.calls.length).toBe(1);
      expect(editor.props().toggleInlineStyle.mock.calls[0][0]).toBe('ITALIC');
    });

    it('has a function to make a word underlined', () => {
      editor.instance().underline();
      expect(editor.props().toggleInlineStyle.mock.calls.length).toBe(1);
      expect(editor.props().toggleInlineStyle.mock.calls[0][0]).toBe('UNDERLINE');
    });

    it('has a function to undo', () => {
      editor.instance().undo();
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a function to redo', () => {
      editor.instance().redo();
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a function to focus the editor', () => {
      editor.instance().focusEditor();
      expect(editor.state().hasFocus).toBe(false);
    });

    it('has a function to clear the editor text', () => {
      editor.instance().clearText();
      expect(props.handleChange.callCount).toBe(3);
    });

    it('has a function to insert an end value', () => {
      editor.props().keyLogger.voiceInput = jest.fn();
      editor.instance().endValue('Some text');
      expect(props.handleChange.callCount).toBe(2);
    });

    it('has a click handler on the wrapper div', () => {
      editor.find('div').first().simulate('click');
      expect(props.handleChange.callCount).toBe(2);
    });

    it('sets an animation class to the editor when it has focus', () => {
      editor.find('div').first().simulate('click');
      editor.setState({ hasFocus: true });
      editor.update();
      expect(editor.find('div.focus.underline-center.animate').length).toBeGreaterThan(0);
    });
  });
});
