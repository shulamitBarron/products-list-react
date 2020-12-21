import { Action } from 'redux';

export interface ProductState {
	products: Product[];
}

export enum TypesNames {
	GET_PRODUCTS = 'GET_PRODUCTS',
	SET_PRODUCTS = 'SET_PRODUCTS',
}

export interface ActionCreator {
	getProducts: () => Action<TypesNames.GET_PRODUCTS>;
	setProducts: (products: Product[]) => SetProductAction;
}

export interface SetProductAction extends Action<TypesNames.SET_PRODUCTS> {
	products: Product[];
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
