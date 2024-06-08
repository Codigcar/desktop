import useContext from 'react';
import { combineReducers } from "@reduxjs/toolkit";
import { AuthContext, authReducer } from '@contexts/auth';

export const rootReducer = combineReducers({
  authReducer,
  // profileReducer
})