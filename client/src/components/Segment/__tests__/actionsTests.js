/* eslint-env and, jest */
import expect from 'expect';

import * as segmentActions from '../ActionCreators/SegmentActions';
import * as types from '../../../constants/actionTypes';

describe('segmentActions', () => {
  it('should have an action to update the target of a translation segment', () => {
    const documentId = 0;
    const segmentId = 0;
    const editorState = 'New Editor State';
    const expectedAction = {
      type: types.UPDATE_TARGET,
      documentId,
      editorState,
      segmentId,
    };

    expect(segmentActions.updateSegment(documentId, segmentId, editorState)).toEqual(expectedAction);
  });


  it('should have an action to lookup a lexicon', () => {
    const lexicon = 'Hello';
    const expectedAction = {
      type: types.LOOKUP,
      lexicon,
    };

    expect(segmentActions.lookupLexicon(lexicon)).toEqual(expectedAction);
  });
});
