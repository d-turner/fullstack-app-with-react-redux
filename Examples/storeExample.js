import { createStore, combineReducers } from 'redux';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Store:
// {
//   todos: [{
//     text: 'Eat food',
//     completed: true
//   }, {
//     text: 'Exercise',
//     completed: false
//   }],
//   visibilityFilter: 'SHOW_COMPLETED'
// }

// Actions:
// must have type
// { type: 'ADD_TODO', text: 'Go to swimming pool' }
// { type: 'TOGGLE_TODO', index: 1 }
// { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  }
  return state;
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }]);
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        (
          action.index === index ? { text: todo.text, completed: !todo.completed } : todo
        ),
      );
    default:
      return state;
  }
}

// Reducer Root
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});
// Same as:
// const todoApp = (state = {}, action) => ({
//   // returns { [todos], visibilityFilter }
//   todos: todos(state.todos, action),
//   visibilityFilter: visibilityFilter(state.visibilityFilter, action),
// });


// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(todoApp);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState()),
);

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
