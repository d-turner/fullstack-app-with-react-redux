import update from 'immutability-helper';
import * as actions from '../../constants/actionTypes';
import apiWrapper from '../../utils/apiWrapper';

const initialState = {
  loggerRecordings: {},
};

function countDelete(array) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].type === 'keystroke') {
      if (array[i].k === 'Backspace' || array[i].k === 'Delete') {
        count++;
      }
    }
  }
  return count;
}

function countNav(array) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].type === 'keystroke') {
      if (array[i].k === 'ArrowRight' ||
      array[i].k === 'ArrowLeft' ||
      array[i].k === 'ArrowUp' ||
      array[i].k === 'ArrowDown' ||
      array[i].k === 'Enter') {
        count++;
      }
    }
  }
  return count;
}

function countMatches(array, regex) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].type === 'keystroke') {
      if (array[i].k.length <= 1 && array[i].k.match(regex)) {
        count++;
      }
    }
  }
  return count;
}

function createNode(xmlDoc, name, type, attributeValue = '') {
  const node = xmlDoc.createElement(name);
  node.setAttribute('type', type);
  const textNode = xmlDoc.createTextNode(attributeValue);
  node.appendChild(textNode);
  return node;
}

function generateAnnotations(xmlDoc, buffer, time) {
  const annotationsNode = xmlDoc.createElement('annotations');
  const annotationNode = xmlDoc.createElement('annotation');

  const seconds = Math.floor(time / 1000);
  const milliseconds = time % 1000;
  const timeString = `${seconds} s, ${milliseconds}`;

  const editing = createNode(xmlDoc, 'indicator', 'time', timeString);
  annotationNode.appendChild(editing);
  // <indicator id="editing" type="time">6s,5</indicator>
  const letters = countMatches(buffer, /[a-zA-Z]/);
  const letterKeys = createNode(xmlDoc, 'indicator', 'letter-keys', letters);
  annotationNode.appendChild(letterKeys);
  // <indicator id="letter-keys" type="count">0</indicator>
  const digits = countMatches(buffer, /[0-9]/);
  const digitKeys = createNode(xmlDoc, 'indicator', 'digit-keys', digits);
  annotationNode.appendChild(digitKeys);
  // <indicator id="digit-keys" type="count">0</indicator>
  const whites = countMatches(buffer, /[ ]/);
  const whiteKeys = createNode(xmlDoc, 'indicator', 'white-keys', whites);
  annotationNode.appendChild(whiteKeys);
  // <indicator id="white-keys" type="count">0</indicator>
  const symbols = countMatches(buffer, /[£$-/:-?{-~!"^_`\[\]#@]/);
  const symbolKeys = createNode(xmlDoc, 'indicator', 'symbol-keys', symbols);
  annotationNode.appendChild(symbolKeys);
  // <indicator id="symbol-keys" type="count">0</indicator>
  const nav = countNav(buffer);
  const navKeys = createNode(xmlDoc, 'indicator', 'navigation-keys', nav);
  annotationNode.appendChild(navKeys);
  // <indicator id="navigation-keys" type="count">0</indicator>
  const erase = countDelete(buffer);
  const eraseKeys = createNode(xmlDoc, 'indicator', 'delete-keys', erase);
  annotationNode.appendChild(eraseKeys);
  // <indicator id="erase-keys" type="count">0</indicator>
  // <indicator id="copy-keys" type="count">0</indicator>
  // <indicator id="cut-keys" type="count">0</indicator>
  // <indicator id="paste-keys" type="count">0</indicator>
  // <indicator id="do-keys" type="count">0</indicator>
  annotationsNode.appendChild(annotationNode);
  return annotationsNode;
}

function buildXML({ loggerRecordings }, action) {
  // TODO: Add progress
  // TODO: Add status (on going / finished / etc) general and per unit
  // xml document setup
  const xmlDoc = document.implementation.createDocument('post-editing-translations', 'root');
  const job = xmlDoc.createElement('job');
  job.setAttribute('document', action.documentId);
  job.setAttribute('user', action.email);
  job.setAttribute('userId', action.userId);
  xmlDoc.getElementsByTagName('root')[0].appendChild(job);

  for (let x = 0; x < loggerRecordings[action.documentId].length; x++) {
    const { buffer, segmentId, source, target, translation } = loggerRecordings[action.documentId][x];
    let startTime = 0;
    let endTime = 0;
    if (buffer.length > 0) {
      startTime = buffer[0].t;
      endTime = buffer[buffer.length - 1].t;
    }

    const length = endTime - startTime;

    // for each recorded log add a new unit tag
    const unit = xmlDoc.createElement('unit');
    unit.setAttribute('id', segmentId);
    xmlDoc.getElementsByTagName('job')[0].appendChild(unit);

    // create the source tag
    const sourceNode = xmlDoc.createElement('source');
    const sourceText = xmlDoc.createTextNode(source);
    sourceNode.appendChild(sourceText);
    xmlDoc.getElementsByTagName('unit')[x].appendChild(sourceNode);

    // create the target tag
    const targetNode = xmlDoc.createElement('target');
    const targetText = xmlDoc.createTextNode(target);
    targetNode.appendChild(targetText);
    xmlDoc.getElementsByTagName('unit')[x].appendChild(targetNode);

    // create the translation tag
    const translationNode = xmlDoc.createElement('translation');
    const translationText = xmlDoc.createTextNode(translation);
    translationNode.appendChild(translationText);
    xmlDoc.getElementsByTagName('unit')[x].appendChild(translationNode);

    // generate the annotations
    const annotations = generateAnnotations(xmlDoc, buffer, length);
    xmlDoc.getElementsByTagName('unit')[x].appendChild(annotations);

    // generate the events
    const events = xmlDoc.createElement('events');
    xmlDoc.getElementsByTagName('annotation')[x].appendChild(events);

    // events start
    const flow = xmlDoc.createElement('flow');
    flow.setAttribute('time', 0);
    flow.innerHTML = 'Editing Start';
    xmlDoc.getElementsByTagName('events')[x].appendChild(flow);

    for (let y = 0; y < buffer.length; y++) {
      if (buffer[y].type === 'keystroke') {
        const event = xmlDoc.createElement(buffer[y].type);
        const eventText = xmlDoc.createTextNode(buffer[y].k);
        event.setAttribute('time', buffer[y].t - startTime);
        event.appendChild(eventText);
        xmlDoc.getElementsByTagName('events')[x].appendChild(event);
      } else if (buffer[y].type === 'drag') {
        const event = xmlDoc.createElement(buffer[y].type);
        event.setAttribute('time', buffer[y].t - startTime);
        event.setAttribute('sourceIndex', buffer[y].sourceIndex);
        event.setAttribute('targetIndex', buffer[y].targetIndex);
        event.setAttribute('sourceWord', buffer[y].sourceWord);
        event.setAttribute('targetWord', buffer[y].targetWord);
        xmlDoc.getElementsByTagName('events')[x].appendChild(event);
      }

      if (y === buffer.length - 1) {
        // events start
        const end = xmlDoc.createElement('flow');
        end.setAttribute('time', length);
        end.innerHTML = 'Editing End';
        xmlDoc.getElementsByTagName('events')[x].appendChild(end);
      }
    }
  }
  return xmlDoc;
}

const KeyLoggerReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_LOGGER:
      if (!state.loggerRecordings[action.logger.documentId]) {
        state.loggerRecordings[action.logger.documentId] = [];
      }
      return update(state, {
        loggerRecordings: {
          [action.logger.documentId]: {
            $push: [action.logger],
          },
        },
      });
    case actions.BUILD:
    case actions.SYNC:
      const xmlDoc = buildXML(state, action);
      const domString = new XMLSerializer().serializeToString(xmlDoc);
      apiWrapper.uploadLog(domString, action.documentId, (result) => {
        console.log(result);
      });
      return state;
    default:
      return state;
  }
};

export default KeyLoggerReducer;
