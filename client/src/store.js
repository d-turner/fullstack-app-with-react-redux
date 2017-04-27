import {createStore} from 'redux';
import reducerRoot from './reducers';

const store = createStore(reducerRoot);

export default store;
