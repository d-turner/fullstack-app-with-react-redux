import $q from 'q';

import { SAVE_DOCUMENT, SAVE_SUCCESS, SAVE_FAIL, SYNC } from '../../constants/actionTypes';
import apiWrapper from '../../utils/apiWrapper';
import fileReader from '../../utils/fileReader';
import xliffParser from '../../utils/xliffTwoParser';

export default function saveLogger(documentId, userId, email) {
  return {
    documentId,
    userId,
    email,
    type: SYNC,
  };
}

export function saveDocument() {
  return {
    type: SAVE_DOCUMENT,
  };
}

export function saveSuccess(response) {
  return {
    type: SAVE_SUCCESS,
    response,
  };
}

export function saveFail(response) {
  return {
    type: SAVE_FAIL,
    response,
  };
}
/* eslint { no-lonely-if: off } */
export function save(doc, documentId, userId, email) {
  return (dispatch) => {
    dispatch(saveDocument());
    dispatch(saveLogger(documentId, userId, email));
    const { DOM, segments } = doc.xliff;
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
    return apiWrapper.sync(domString, documentId)
      .then((response) => {
        dispatch(saveSuccess(response));
      })
      .catch((error) => {
        dispatch(saveFail(error.response));
      });
  };
}
