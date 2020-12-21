import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ProductState, TypesNames, ActionCreator, SetProductAction
} from './interfaces';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getProducts: [],
	setProducts: ['products']
});

export const ProductTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ProductState>({
	products: []
});

/* ------------- Selectors ------------- */

export const productSelector = {
	getProductsList: (state: ApplicationState) => state.product.products
};

/* ------------- Reducers ------------- */

const setProductsReducer = (state: ImmutableObject<ProductState>, action: SetProductAction) => {
	const { products } = action;
	return state.merge({ products });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[ProductTypes.SET_PRODUCTS]: setProductsReducer
});
