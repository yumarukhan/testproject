import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import newsReducer from './reducers/newsReducer';

const rootReducer = combineReducers({
    news: newsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
