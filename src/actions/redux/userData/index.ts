import Immutable, { from } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	UserDataState, TypesNames, ActionCreator, SetUserDataAction,
} from './interfaces';
import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setUserData: ['userData'],
	clearUserData: [],
});

export const UserDataTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<UserDataState>({
	userData: null,
});

/* ------------- Selectors ------------- */

export const userDataSelector = {
	getUserData: (state: ApplicationState) => state.user.userData,
};

/* ------------- Reducers ------------- */

const setUserDataReducer = (state: UserDataState, action: SetUserDataAction) => {
	const { userData } = action;
	return from(state).merge({ userData });
};

const clearUserDataReducer = (state: UserDataState) => {
	return from(state).merge({ userData: null });
};

/* ------------- Hookup Reducers To Types ------------- */

const userDataReducer = createReducer<any, AnyAction>(INITIAL_STATE, {
	[UserDataTypes.SET_USER_DATA]: setUserDataReducer,
	[UserDataTypes.CLEAR_USER_DATA]: clearUserDataReducer,
});

const persistConfig = {
	key: 'userData',
	storage: localStorage
};

export const reducer = persistReducer(persistConfig, userDataReducer);
