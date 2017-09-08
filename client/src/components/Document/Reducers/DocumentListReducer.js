import * as actions from '../../../constants/actionTypes';

// const initialState = {
//   documents: {},
//   lexicon: '',
//   selectedSegment: 0,
//   editorState: '',
//   find: {
//     isFinding: false,
//     render: false,
//     word: '',
//     index: 0,
//     offset: 0,
//   },
// };

const blankDocument = {
  id: '',
  name: '',
  saved_name: '',
  description: '',
  created_at: '',
  isFetching: false,
  didInvalidate: true,
  xliff: {},
};

const createNewDocumentEntry = (state = blankDocument, doc) => {
  return Object.assign({}, state, {
    id: doc.document_id,
    name: doc.name,
    isFetching: false,
    saved_name: doc.saved_name,
    description: doc.description,
    created_at: doc.created_at,
  });
};

export default function DocumentList(state, action) {
  switch (action.type) {
    case actions.INSERT_DOCUMENTS:
      const documents = {};
      const docs = action.documents;
      for (let x = 0; x < docs.length; x++) {
        const savedName = docs[x].saved_name;
        documents[savedName] = createNewDocumentEntry(state.documents[action.saved_name], docs[x]);
      }
      return {
        ...state,
        documents,
      };
    default:
      return state;
  }
}
