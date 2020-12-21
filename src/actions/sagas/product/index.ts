import { all, fork, takeLatest } from 'redux-saga/effects';
import * as Sagas from './sagas';
import { ProductTypes } from 'actions/redux/product';
// import {  } from 'actions/redux/product/interfaces';

function* watchMySaga() {
	yield takeLatest(ProductTypes.GET_PRODUCTS, Sagas.getProducts);
}

function* productSaga() {
	yield all([fork(watchMySaga)]);
}

export default productSaga;
