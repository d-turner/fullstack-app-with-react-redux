export const touchDndCustomEvents = {
  dataTransfer: null,
  draggedItem: null,
  lastDraggedOver: null,
  dragOvers: null,
  store: null,
};

/* eslint no-lonely-if: off, no-loop-func: off */
export const addEvent = (el, type, fn) => {
  if (document.addEventListener) {
    if (el && el.nodeName || el === window) {
      el.addEventListener(type, fn, { passive: true, capture: true });
    } else if (el && el.length) {
      for (let i = 0; i < el.length; i++) {
        addEvent(el[i], type, fn);
      }
    }
  } else {
    if (el && el.nodeName || el === window) {
      el.attachEvent('on' + type, () => { return fn.call(el, window.event); });
    } else if (el && el.length) {
      for (let i = 0; i < el.length; i++) {
        addEvent(el[i], type, fn);
      }
    }
  }
};

export const removeEvent = (el, type, fn) => {
  if (document.addEventListener) {
    if (el && el.nodeName || el === window) {
      el.removeEventListener(type, fn);
    } else if (el && el.length) {
      for (let i = 0; i < el.length; i++) {
        removeEvent(el[i], type, fn);
      }
    }
  } else {
    if (el && el.nodeName || el === window) {
      el.detachEvent('on' + type, () => { return fn.call(el, window.event); });
    } else if (el && el.length) {
      for (let i = 0; i < el.length; i++) {
        removeEvent(el[i], type, fn);
      }
    }
  }
};

export const syntheticEvent = (type, touchEvent, dataTransfer, target) => {
  const touchDetails = touchEvent.changedTouches[0];
  const event = new Event(type, { bubbles: true });

  event.altkey = touchEvent.altkey;
  event.button = 0;
  event.buttons = 1;
  event.cancelBubble = false;
  event.clientX = touchDetails.clientX;
  event.clientY = touchDetails.clientY;
  event.ctrlKey = touchEvent.ctrlKey;
  event.dataTransfer = dataTransfer;
  event.layerX = 0;
  event.layerY = 0;
  event.metaKey = false;
  event.movementX = 0;
  event.movementY = 0;
  event.offsetX = touchDetails.pageX - target.offsetLeft;
  event.offsetY = touchDetails.pageY - target.offsetTop;
  event.pageX = touchDetails.pageX;
  event.pageY = touchDetails.pageY;
  event.relatedTarget = touchEvent.relatedTarget;
  event.returnValue = touchEvent.returnValue;
  event.screenX = touchDetails.screenX;
  event.screenY = touchDetails.screenY;
  event.shiftKey = touchEvent.shiftKey;
  event.sourceCapabilities = touchEvent.sourceCapabilities;
  event.view = touchEvent.view;
  event.which = 1;
  event.x = touchDetails.clientX;
  event.y = touchDetails.clientY;

  return event;
};
