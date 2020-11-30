import { Action } from 'redux';

export interface ProductState {
	exampleData: string;
}

export enum TypesNames {
	SET_EXAMPLE = 'SET_EXAMPLE'
}

export interface ActionCreator {
	setExample: (exampleData: string) => ProductAction;
}

export interface ProductAction extends Action<TypesNames.SET_EXAMPLE> {
	exampleData: string;
}

export interface Product {
	id: string;
	isInStock: boolean;
	price: string;
	picture: string;
	name: string;
	group: string;
	description: string;
	registered: string;
}
