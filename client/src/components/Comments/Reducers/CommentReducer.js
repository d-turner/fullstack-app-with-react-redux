import update from 'immutability-helper';

import * as actions from '../../../constants/actionTypes';

function getDate() {
  const date = new Date(Date.now());
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('en-us', options);
}

let genId = 4;
const initialState = {
  comments: {
  },
};

const emptyComment = {
  id: null,
  author: null,
  time: null,
  text: null,
};

function creatCommentObject(state, action) {
  const result = {};
  const docs = action.documents;
  for (let i = 0; i < docs.length; i++) {
    if (!state.comments[docs[i].saved_name]) {
      result[docs[i].saved_name] = {};
    }
  }
  return update(state, {
    comments: { $merge: result },
  });
}


function addComment(state, action) {
  if (state.comments[action.documentId][action.segmentId] === undefined) {
    return {
      ...state,
      comments: {
        ...state.comments,
        [action.documentId]: {
          ...state.comments[action.documentId],
          [action.segmentId]: [
            {
              id: genId++,
              author: action.author,
              time: getDate(),
              text: action.comment,
            },
          ],
        },
      },
    };
  }
  return {
    ...state,
    comments: {
      ...state.comments,
      [action.documentId]: {
        ...state.comments[action.documentId],
        [action.segmentId]: [...state.comments[action.documentId][action.segmentId],
          {
            id: genId++,
            author: action.author,
            time: getDate(),
            text: action.comment,
          },
        ],
      },
    },
  };
}

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.INSERT_DOCUMENTS:
      return creatCommentObject(state, action);
    case actions.ADD_COMMENT:
      return addComment(state, action);
    case actions.EDIT_COMMENT:
    case actions.RESOLVE_COMMENT:
      console.log('HERE');
      return state;
    default:
      return state;
  }
}
