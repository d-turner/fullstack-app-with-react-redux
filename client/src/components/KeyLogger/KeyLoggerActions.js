import * as actions from '../../constants/actionTypes';

export function addLogger(logger) {
  return {
    type: actions.ADD_LOGGER,
    logger,
  };
}

export function build() {
  return {
    type: actions.BUILD,
  };
}
