import { combineReducers } from 'redux';
import { commonReducer } from './common/reducers';

const appReducer = combineReducers({
  commonReducer,
});

export default appReducer;
