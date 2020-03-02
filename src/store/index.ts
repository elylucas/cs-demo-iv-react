import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, CombinedState, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import { TeaCategory } from '../models';

const loggerMiddleware = createLogger();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// I would probably move these down below into a selectors file
// This is a great pattern. Not exposing your store directly to the components means you can refactor
// the store structure without affecting the components. I like to think of these like SQL statements into redux store.
// There is a library called reselect that makes building these a bit easier and provides performance benefits because
// it memoizes the requests, but its probably overkill for this small app



export const getTeaCategories = (state: CombinedState<{ teaCategories: any }>) => {
  return state.teaCategories.categories;
};

export const getTeaCategory = (state: CombinedState<{ teaCategories: any }>, id: number) => {
  return state.teaCategories.categories.find((cat: TeaCategory) => cat.id === id);
};

export const getAuthMode = (state: CombinedState<{ settings: any }>) => {
  return state.settings.authMode;
};

// strongly typing the state would help
export const getAuthError = (state: CombinedState<{ auth: { error?: { message: string }} }>) => {
  return state.auth.error;
};

export const getAuthStatus = (state: CombinedState<{ auth: any }>) => {
  return state.auth.status;
};

export const getEMail = (state: CombinedState<{ auth: any }>) => {
  return state.auth.email;
};

export const getVaultAuthMode = (state: CombinedState<{ auth: any }>) => {
  return state.auth.authMode;
};

export const getBiometricType = (state: CombinedState<{ auth: any }>) => {
  return state.auth.biometricType;
};

export const getShowPinDialog = (state: CombinedState<{ auth: any }>) => {
  return state.auth.showPinDialog;
};

export const getIsSetApplicationPinMode = (state: CombinedState<{ auth: any }>) => {
  return state.auth.setApplicationPin;
};

export const getEnteredPIN = (state: CombinedState<{ auth: any }>) => {
  return state.auth.enteredPIN;
};

export const getHasSession = (state: CombinedState<{ auth: any }>) => {
  return state.auth.hasSession;
};
