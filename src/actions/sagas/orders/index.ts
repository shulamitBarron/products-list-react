import {
	all, fork, takeLatest
} from 'redux-saga/effects';
import * as Sagas from './sagas';
import { OrdersTypes } from 'actions/redux/orders';

function* watchOrdersSaga() {
	yield takeLatest(OrdersTypes.GET_ORDERS, Sagas.getOrders);
}

function* ordersSaga() {
	yield all([
		fork(watchOrdersSaga)
	]);
}

export default ordersSaga;
