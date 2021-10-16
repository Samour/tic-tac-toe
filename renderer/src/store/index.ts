import { createStore } from 'redux';
import reducer from './reducers';

console.log('createStore()');
const store = createStore(reducer);

export default store;
