import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
// import { ApplicationState } from 'actions/redux';
import { TranslateFunction } from 'react-localize-redux';
import { sortBy } from 'lodash';
import data from 'actions/redux/product/products.json';
import { Product } from 'actions/redux/product/interfaces';
import { Container } from 'react-bootstrap';
import FilterableProductTable from 'containers/products/FilterableProductTable';
// import ProductsActions, { productsSelector } from 'actions/redux/products';

interface Props {
	translate: TranslateFunction;
}

class Products extends React.Component<Props> {
	products: Product[] = sortBy(data, ['group']) as any as Product[];

	render() {
		return (
			<Container>
				<h1>Product List</h1>
				<FilterableProductTable products={this.products} />
			</Container>
		);
	}
}

export default baseConnect(Products,
	() => {
		return {

		};
	},
	{

	});
