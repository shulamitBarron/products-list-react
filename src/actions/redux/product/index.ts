import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ProductState, TypesNames, ActionCreator, ProductAction
} from './interfaces';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	setExample: ['exampleData']
});

export const ProductTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<ProductState>({
	exampleData: 'Initial Data Example'
});

/* ------------- Selectors ------------- */

export const productSelector = {
	getExampleData: (state: ApplicationState) => state.product.exampleData
};

/* ------------- Reducers ------------- */

const setExampleReducer = (state: ImmutableObject<ProductState>, action: ProductAction) => {
	const { exampleData } = action;
	return state.merge({ exampleData });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<ImmutableObject<any, any>(INITIAL_STATE, {
	[ProductTypes.SET_EXAMPLE]: setExampleReducer
});
