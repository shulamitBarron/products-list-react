import Immutable, { ImmutableObject } from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	OrderState, TypesNames, ActionCreator, SetOrdersAction, Order
} from './interfaces';
import { AnyAction } from 'redux';
import { createSelector } from 'reselect';
import { productSelector } from '../product';
import { Product } from '../product/interfaces';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getOrders: [],
	setOrders: ['orders'],
});

export const OrdersTypes = TypesNames;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable<OrderState>({
	orders: [],
});

/* ------------- Selectors ------------- */
const getOrders = (state: ApplicationState) => state.orders.orders;

const getOrdersWithPoducts = (orders: Order[], products: Product[]) => {
	return orders.map((order) => ({
		...order,
		items: order.items.map((item) => {
			const product = products.find((p) => p.id === item.id);
			return {
				...item,
				product
			};
		})
	}));
};

const getDetailedOrders = createSelector(
	[getOrders, productSelector.getAllProducts],
	getOrdersWithPoducts
);

export const ordersSelector = {
	getOrders,
	getDetailedOrders,
};

/* ------------- Reducers ------------- */

const setOrdersReducer = (state: ImmutableObject<OrderState>, action: SetOrdersAction) => {
	const { orders } = action;
	return state.merge({ orders });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<ImmutableObject<OrderState>, AnyAction>(INITIAL_STATE, {
	[OrdersTypes.SET_ORDERS]: setOrdersReducer,
});
