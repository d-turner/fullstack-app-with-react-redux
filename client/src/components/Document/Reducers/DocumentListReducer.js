import update from 'immutability-helper';
import * as actions from '../../../constants/actionTypes';

const createNewDocumentEntry = (state, doc) => {
  let meta = null;
  if (doc.segment_count !== null) {
    meta = {
      completedSegments: doc.completed_segments,
      segmentCount: doc.segment_count,
      listOrder: doc.list_order,
      totalWords: doc.total_word_count,
    };
  }
  return Object.assign({}, state, {
    id: doc.document_id,
    name: doc.name,
    saved_name: doc.saved_name,
    description: doc.description,
    created_at: doc.created_at,
    xliff: doc.xliff || {},
    segments: doc.segments || null,
    didInvalidate: doc.didInvalidate !== undefined ? doc.didInvalidate : true,
    isFetching: doc.isFetching !== undefined ? doc.isFetching : false,
    meta,
    history: { prev: [], next: [] },
  });
};

const deleteDocument = (state, documentId) => {
  return Object.keys(state)
    .filter(key => key !== documentId)
    .reduce((result, current) => {
      result[current] = state[current];
      return result;
    }, {});
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
    case actions.DELETE_DOCUMENT: {
      return update(state, {
        documents: { $set: deleteDocument(state.documents, action.documentId) },
      });
    }
    case actions.ORDER_SUCCESS:
      return update(state, {
        documents: {
          [action.document.saved_name]: {
            meta: {
              listOrder: { $set: action.index },
            },
          },
        },
      });
    default:
      return state;
  }
}
