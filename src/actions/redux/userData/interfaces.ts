import { Action } from 'redux';

export interface UserDataState {
	userData: User | null;
}

export enum TypesNames {
	SET_USER_DATA = 'SET_USER_DATA',
	CLEAR_USER_DATA = 'CLEAR_USER_DATA',
}

export interface ActionCreator {
	setUserData: (userData: User) => SetUserDataAction;
	clearUserData: () => Action<TypesNames.CLEAR_USER_DATA>;
}

export interface SetUserDataAction extends Action<TypesNames.SET_USER_DATA>{
	userData: User;
}

export enum Gender {
	MALE,
	FEMALE
}

export class User {
	firstName: string;
	lastName: string;
	phone: string;
	gender: Gender;
}
