import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import commonReducer from './commonReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
});

const reducerForNext = (state, action: AnyAction) => {
  if (action.type === HYDRATE) {
    //when SSR HYDRATE Action do synchrozie store of server with client
    return {
      ...state,
      ...action.payload,
    };
  }

  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default reducerForNext;
