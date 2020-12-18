import { combineReducers, Reducer } from 'redux';

import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';
import { CatalogState } from './catalog/interfaces';
import { CartState } from './cart/interfaces';
import { ProductState } from './product/interfaces';

export interface ApplicationState extends BaseApplicationState {
	product: ProductState;
	cart: CartState;
	catalog: CatalogState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,
	product: require('./product').reducer,
	cart: require('./cart').reducer,
	catalog: require('./catalog').reducer
});

export default rootReducer;
