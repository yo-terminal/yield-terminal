import { combineReducers } from 'redux';
import depositDialog from './depositDialog/depositDialogSlice';
import closePositionDialog from './closePositionDialog/closePositionDialogSlice';

const reducer = combineReducers({
  depositDialog,
  closePositionDialog,
});

export default reducer;
