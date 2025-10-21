import { createStore } from 'redux';
import todoReducer from './reducer';

// ✅ If you installed @redux-devtools/extension
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(todoReducer, composeWithDevTools());
export default store;
