import { Action } from 'redux';

export interface ProductState {
	products: Product[];
	filter: ProductFilter;
	loading: boolean;
	success: boolean;
	error: boolean;
}

export enum TypesNames {
	GET_PRODUCTS = 'GET_PRODUCTS',
	SET_PRODUCTS = 'SET_PRODUCTS',
	SET_FILTER = 'SET_FILTER',
	CREATE_PRODUCT = 'CREATE_PRODUCT',
	UPDATE_PRODUCT = 'UPDATE_PRODUCT',
	SET_PRODUCT = 'SET_PRODUCT',
	PRODUCT_ERROR = 'PRODUCT_ERROR',
	LOAD_PRODUCT = 'LOAD_PRODUCT',
}

export interface ActionCreator {
	getProducts: () => Action<TypesNames.GET_PRODUCTS>;
	setProducts: (products: Product[]) => SetProductsAction;
	setFilter: (filter: ProductFilter) => SetFilterProductAction;
	createProduct: (product: Product) => CreateProductAction;
	updateProduct: (product: Product) => UpdateProductAction;
	setProduct: (product: Product) => SetProductAction;
	loadProduct: () => Action<TypesNames.LOAD_PRODUCT>;
}

export interface SetProductsAction extends Action<TypesNames.SET_PRODUCTS> {
	products: Product[];
}

export interface SetFilterProductAction extends Action<TypesNames.SET_FILTER> {
	filter: ProductFilter;
}
export interface CreateProductAction extends Action<TypesNames.CREATE_PRODUCT> {
	product: Product;
}
export interface UpdateProductAction extends Action<TypesNames.UPDATE_PRODUCT> {
	product: Product;
}
export interface SetProductAction extends Action<TypesNames.SET_PRODUCT> {
	product: Product;
}

export class Product {
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
