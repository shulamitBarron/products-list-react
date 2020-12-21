import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions/redux';
import { TranslateFunction } from 'react-localize-redux';
import { Product } from 'actions/redux/product/interfaces';
import { Container } from 'react-bootstrap';
import FilterableProductTable from 'containers/products/FilterableProductTable';
import ProductActions, { productSelector } from 'actions/redux/product';
import { Dispatch } from 'redux';

interface Props {
	translate: TranslateFunction;
	products: Product[];
	getProductsList: () => void;
}

class Products extends React.Component<Props> {
	componentDidMount() {
		const { getProductsList, products } = this.props;
		if (products.length === 0) {
			getProductsList();
		}
	}

	render() {
		const { products } = this.props;
		return (
			<Container>
				<h1>Product List</h1>
				<FilterableProductTable products={products} />
			</Container>
		);
	}
}

export default baseConnect(Products,
	(state: ApplicationState) => {
		return {
			products: productSelector.getProductsList(state)
		};
	},
	(dispatch: Dispatch) => ({
		getProductsList: () => dispatch(ProductActions.getProducts())
	}));
