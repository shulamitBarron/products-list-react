import { Action } from 'redux';

export interface ProductState {
	products: Product[];
	filter: ProductFilter;
}

export enum TypesNames {
	GET_PRODUCTS = 'GET_PRODUCTS',
	SET_PRODUCTS = 'SET_PRODUCTS',
	SET_FILTER = 'SET_FILTER'
}

export interface ActionCreator {
	getProducts: () => Action<TypesNames.GET_PRODUCTS>;
	setProducts: (products: Product[]) => SetProductAction;
	setFilter: (filter: ProductFilter) => SetFilterProductAction;
}

export interface SetProductAction extends Action<TypesNames.SET_PRODUCTS> {
	products: Product[];
}

export interface SetFilterProductAction extends Action<TypesNames.SET_FILTER> {
	filter: ProductFilter;
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

export interface ProductFilter {
	inStockOnly: boolean;
	filterText: string;
}
