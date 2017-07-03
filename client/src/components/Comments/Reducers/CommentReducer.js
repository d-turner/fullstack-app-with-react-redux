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
    123456: {},
    123457: {
      0: [{
        id: 1,
        author: 'Daniel Turner',
        time: getDate(),
        text: 'This is a test comment 1 on segment 0',
      }],
      1: [{
        id: 2,
        author: 'Daniel Turner',
        time: getDate(),
        text: 'This is a test comment 2 on segment 1',
      },
      {
        id: 3,
        author: 'Daniel Turner',
        time: getDate(),
        text: 'This is a test comment 3 on segment 1',
      }],
    },
  },
};

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
