import update from 'immutability-helper';
import * as actions from '../../../constants/actionTypes';

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
    saved_name: doc.saved_name,
    description: doc.description,
    created_at: doc.created_at,
  });
};

export default function DocumentList(state, action) {
  switch (action.type) {
    case actions.INSERT_DOCUMENTS: {
      const documents = {};
      const docs = action.documents;
      for (let x = 0; x < docs.length; x++) {
        const savedName = docs[x].saved_name;
        documents[savedName] = createNewDocumentEntry(state.documents[savedName], docs[x]);
      }
      return update(state, {
        documents: { $merge: documents },
      });
    }
    default:
      return state;
  }
}

// import { Map } from 'immutable';
// import update from 'immutability-helper';

// import * as actions from '../../../constants/actionTypes';

// const blankDocument = Map({
//   id: '',
//   name: '',
//   saved_name: '',
//   description: '',
//   created_at: '',
//   isFetching: false,
//   didInvalidate: true,
//   xliff: {},
// });

// const createNewDocumentEntry = (state = blankDocument, doc) => {
//   return state.merge({
//     id: doc.document_id,
//     name: doc.name,
//     saved_name: doc.saved_name,
//     description: doc.description,
//     created_at: doc.created_at,
//   });
// };

// export default function DocumentList(state, action) {
//   switch (action.type) {
//     case actions.INSERT_DOCUMENTS: {
//       const documents = {};
//       const docs = action.documents;
//       for (let x = 0; x < docs.length; x++) {
//         const savedName = docs[x].saved_name;
//         documents[savedName] = createNewDocumentEntry(state.documents[savedName], docs[x]);
//       }
//       return update(state, {
//         documents: { $merge: documents },
//       });
//     }
//     default:
//       return state;
//   }
// }
