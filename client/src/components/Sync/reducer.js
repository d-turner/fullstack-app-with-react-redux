import $q from 'q';

import apiWrapper from '../../utils/apiWrapper';
import fileReader from '../../utils/fileReader';
import xliffParser from '../../utils/xliffTwoParser';

const DocumentReducer = function(state, action) {
  const doc = state.documents[action.documentId];
  console.log(doc);
  const DOM = doc.xliff.DOM;
  const segments = doc.xliff.segments;
  let found = false;
  for (let i = 0; i < segments.length; i++) {
    found = false;
    const sourceTags = DOM.getElementsByTagName('source');
    const targetTags = DOM.getElementsByTagName('target');
    for (let y = 0; y < sourceTags.length && !found; y++) {
      const currentSource = sourceTags[y];
      if (currentSource.parentNode.nodeName === 'alt-trans') {
        // ignore these cases for now
      } else {
        if (currentSource.innerHTML === segments[i].source) {
          // it does not have to change in the store just the file on the server
          targetTags[y].innerHTML = segments[i].target;
          found = true;
        } else {
          const segSource = currentSource.nextElementSibling;
          const mrk = segSource.getElementsByTagName('mrk');
          for (let z = 0; z < mrk.length && !found; z++) {
            if (mrk[z].innerHTML === segments[i].source) {
              targetTags[y].getElementsByTagName('mrk')[z].innerHTML = segments[i].target;
              found = true;
              break;
            }
          }
        }
      }
    }
  }
  const reader = fileReader($q);
  const parser = xliffParser(reader, $q, console);
  const domString = parser.getDOMString(DOM);
  apiWrapper.sync(domString, action.documentId, (result) => {
    console.log(result);
  });
  return state;
};

export default DocumentReducer;
