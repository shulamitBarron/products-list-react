import { fork, all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import catalogSaga from './catalog';
import cartSaga from './cart';
import flowManagerSaga from './flowManager';
import product from './product';
import ordersSaga from './orders';

export default function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(cartSaga)]);
	yield all([fork(catalogSaga)]);
	yield all([fork(product)]);
	yield all([fork(ordersSaga)]);
}
