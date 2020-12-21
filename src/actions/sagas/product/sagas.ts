import { put } from 'redux-saga/effects';
import ProductActions from 'actions/redux/product';
import { Product } from 'actions/redux/product/interfaces';
import data from './products.json';
import { sortBy } from 'lodash';

export function* getProducts() {
	const mockProductList: Product[] = sortBy(data, ['group']) as Product[];
	yield put(ProductActions.setProducts(mockProductList));
}

