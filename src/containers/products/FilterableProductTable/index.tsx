import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { Col, Container, Row } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux';
import { InjectedFormProps } from 'redux-form';

import { ApplicationState } from 'actions/redux';
import { Product, ProductFilter } from 'actions/redux/product/interfaces';
import ProductActions, { productSelector } from 'actions/redux/product';
import { Dispatch } from 'redux';

import ProductSearchBar from '../ProductSearchBar';
import ProductTable from '../ProductTable';
import ProductView from '../ProductView';

interface Props extends InjectedFormProps {
	translate: TranslateFunction;
}

interface OwnProps {
	products: Product[];
	getProductsList: () => void;
	filter: ProductFilter;
	setFilter: (filter: ProductFilter) => void;
}

interface State {
	selectedProduct: Product | null;
}

class FilterableProductTable extends React.PureComponent<Props & OwnProps, State> {
	constructor(props: Props & OwnProps) {
		super(props);

		this.state = {
			selectedProduct: null
		};

		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}

	componentDidMount() {
		const { getProductsList, products } = this.props;
		if (products.length === 0) {
			getProductsList();
		}
	}

	handleProductSelected(selectedProduct: Product) {
		this.setState({ selectedProduct });
	}

	handleFilterTextChange(filterText: string) {
		const { setFilter, filter } = this.props;
		setFilter({ ...filter, filterText });
	}

	handleInStockChange(inStockOnly: boolean) {
		const { setFilter, filter } = this.props;
		setFilter({ ...filter, inStockOnly });
	}

	render() {
		const { filter: { filterText, inStockOnly }, products, translate } = this.props;
		const { selectedProduct } = this.state;

		return (
			<Container fluid>
				<Row>
					<ProductSearchBar
						filterText={filterText}
						inStockOnly={inStockOnly}
						onFilterTextChange={this.handleFilterTextChange}
						onInStockChange={this.handleInStockChange}
					/>
				</Row>
				<Row>
					<Col lg={8}>
						<ProductTable
							products={products}
							translate={translate}
							selectedProductId={selectedProduct ? selectedProduct.id : ''}
							onProductSelected={this.handleProductSelected}
						/>
					</Col>
					<Col lg={4}>
						{selectedProduct != null && <ProductView translate={translate} product={selectedProduct} />}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default baseConnect(FilterableProductTable,
	(state: ApplicationState) => {
		return {
			products: productSelector.getProductsList(state),
			filter: productSelector.getFilter(state)
		};
	},
	(dispatch: Dispatch) => ({
		getProductsList: () => dispatch(ProductActions.getProducts()),
		setFilter: (filter: ProductFilter) => dispatch(ProductActions.setFilter(filter))
	}));
