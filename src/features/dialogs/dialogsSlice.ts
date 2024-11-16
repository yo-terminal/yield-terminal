import { combineReducers } from 'redux';
import depositDialog from './depositDialog/depositDialogSlice';

const reducer = combineReducers({
  depositDialog,
});

export default reducer;
