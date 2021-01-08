import { put } from 'redux-saga/effects';
import ProductActions from 'actions/redux/product';
import { CreateProductAction, Product, UpdateProductAction } from 'actions/redux/product/interfaces';
import data from './products.json';
import { sortBy } from 'lodash';
import { Guid } from 'guid-typescript';

export function* getProducts() {
	yield put(ProductActions.loadProduct());
	const mockProductList: Product[] = sortBy(data, ['group']) as Product[];
	yield put(ProductActions.setProducts(mockProductList));
}

export function* createProduct({ product }: CreateProductAction) {
	yield put(ProductActions.loadProduct());
	const newProduct: Product = { ...product, id: Guid.raw() };
	yield put(ProductActions.setProduct(newProduct));
}

export function* updateProduct({ product }: UpdateProductAction) {
	yield put(ProductActions.loadProduct());
	yield put(ProductActions.setProduct(product));
}
