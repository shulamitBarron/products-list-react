import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ProductState, TypesNames, ActionCreator, SetProductAction, SetFilterProductAction
} from './interfaces';
import { AnyAction } from 'redux';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getProducts: [],
	setProducts: ['products'],
	setFilter: ['filter']
});

export const ProductTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ProductState>({
	products: [],
	filter: {
		inStockOnly: true,
		filterText: ''
	}
});

/* ------------- Selectors ------------- */

export const productSelector = {
	getProductsList: (state: ApplicationState) => state.product.products,
	getFilter: (state: ApplicationState) => state.product.filter
};

/* ------------- Reducers ------------- */

const setProductsReducer = (state: ImmutableObject<ProductState>, action: SetProductAction) => {
	const { products } = action;
	return state.merge({ products });
};

const setFilterProductReducer = (state: ImmutableObject<ProductState>, action: SetFilterProductAction) => {
	const { filter } = action;
	return state.merge({ filter });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<ImmutableObject<ProductState>, AnyAction>(INITIAL_STATE, {
	[ProductTypes.SET_PRODUCTS]: setProductsReducer,
	[ProductTypes.SET_FILTER]: setFilterProductReducer,
});
