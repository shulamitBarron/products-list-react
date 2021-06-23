import { put } from 'redux-saga/effects';
import OrdersActions from 'actions/redux/orders';
import { Order } from 'actions/redux/orders/interfaces';
import data from './orders.json';

export function* getOrders() {
	const mockOrdersList: Order[] = data as Order[];
	yield put(OrdersActions.setOrders(mockOrdersList));
}
