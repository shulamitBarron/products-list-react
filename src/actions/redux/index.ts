import { combineReducers, Reducer } from 'redux';

import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';
import { CatalogState } from './catalog/interfaces';
import { CartState } from './cart/interfaces';
import { ProductState } from './product/interfaces';
import { UserDataState } from './userData/interfaces';
import { OrderState } from './orders/interfaces';

export interface ApplicationState extends BaseApplicationState {
	product: ProductState;
	cart: CartState;
	catalog: CatalogState;
	user: UserDataState;
	orders: OrderState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,
	product: require('./product').reducer,
	cart: require('./cart').reducer,
	catalog: require('./catalog').reducer,
	user: require('./userData').reducer,
	orders: require('./orders').reducer
});

export default rootReducer;
