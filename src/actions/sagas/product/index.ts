import {
	all, fork, takeEvery, takeLatest
} from 'redux-saga/effects';
import * as Sagas from './sagas';
import { ProductTypes } from 'actions/redux/product';

function* watchProductsSaga() {
	yield takeLatest(ProductTypes.GET_PRODUCTS, Sagas.getProducts);
}

function* watchUpdateProductSaga() {
	yield takeEvery(ProductTypes.UPDATE_PRODUCT, Sagas.updateProduct);
}

function* watchCreateProductSaga() {
	yield takeEvery(ProductTypes.CREATE_PRODUCT, Sagas.createProduct);
}

function* watchDeleteProductSaga() {
	yield takeEvery(ProductTypes.DELETE_PRODUCT, Sagas.deleteProduct);
}

function* productSaga() {
	yield all([
		fork(watchProductsSaga),
		fork(watchCreateProductSaga),
		fork(watchUpdateProductSaga),
		fork(watchDeleteProductSaga)
	]);
}

export default productSaga;
