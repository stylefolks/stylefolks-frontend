import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import uploadReducer from './eachReducer';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    //when SSR HYDRATE Action do synchrozie store of server with client
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    upload: uploadReducer,
    //add more in here
  })(state, action);
};

export type RootState = ReturnType<typeof reducer>;
export default reducer;
