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
import ProductView from 'common-components/business/ProductView';

interface Props extends InjectedFormProps {
	translate: TranslateFunction;
}

interface OwnProps {
	products: Product[];
	getProductsList: () => void;
	filter: ProductFilter;
	selectedProduct: Product | null;
	setFilter: (filter: ProductFilter) => void;
	setSelectedProduct: (selectedProduct: Product) => void;
	deleteProduct: (id: string) => void;
}

class FilterableProductTable extends React.PureComponent<Props & OwnProps> {
	constructor(props: Props & OwnProps) {
		super(props);

		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleIdFilterTextChange = this.handleIdFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}

	componentDidMount() {
		const { getProductsList, products } = this.props;
		if (products.length === 0) {
			getProductsList();
		}
	}

	handleProductSelected(selectedProduct: Product) {
		const { setSelectedProduct } = this.props;
		setSelectedProduct(selectedProduct);
	}

	handleFilterTextChange(filterText: string) {
		const { setFilter, filter } = this.props;
		setFilter({ ...filter, filterText });
	}
	
	handleIdFilterTextChange(idFilterText: string) {
		const { setFilter, filter } = this.props;
		setFilter({ ...filter, idFilterText });
	}

	handleInStockChange(inStockOnly: boolean) {
		const { setFilter, filter } = this.props;
		setFilter({ ...filter, inStockOnly });
	}

	render() {
		const {
			filter: { filterText, inStockOnly, idFilterText }, selectedProduct, products, translate, deleteProduct
		} = this.props;

		return (
			<Container fluid>
				<Row>
					<ProductSearchBar
						filterText={filterText}
						inStockOnly={inStockOnly}
						idFilterText={idFilterText}
						onFilterTextChange={this.handleFilterTextChange}
						onIdFilterTextChange={this.handleIdFilterTextChange}
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
						{selectedProduct != null && <ProductView translate={translate} product={selectedProduct} deleteProduct={deleteProduct} isEditble />}
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
			filter: productSelector.getFilter(state),
			selectedProduct: productSelector.getSelectedProduct(state)
		};
	},
	(dispatch: Dispatch) => ({
		getProductsList: () => dispatch(ProductActions.getProducts()),
		setFilter: (filter: ProductFilter) => dispatch(ProductActions.setFilter(filter)),
		setSelectedProduct: (selectedProduct: Product) => dispatch(ProductActions.setSelectedProduct(selectedProduct)),
		deleteProduct: (id: string) => dispatch(ProductActions.deleteProduct(id))
	}));
