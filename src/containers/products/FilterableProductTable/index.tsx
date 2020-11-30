import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
// import { ApplicationState } from 'actions/redux';
import { Col, Container, Row } from 'react-bootstrap';
import ProductSearchBar from '../ProductSearchBar';
import { Product } from 'actions/redux/product/interfaces';
import ProductTable from '../ProductTable';
import ProductView from '../ProductView';
import { TranslateFunction } from 'react-localize-redux';
import { InjectedFormProps } from 'redux-form';

// import FilterableProductTableActions, { filterableProductTableSelector } from 'actions/redux/filterableProductTable';

interface Props extends InjectedFormProps {
	translate: TranslateFunction;
}

interface OwnProps {
	products: Product[];
}

interface State {
	filterText: string;
	inStockOnly: boolean;
	selectedProduct: Product | null;
}

class FilterableProductTable extends React.Component<Props & OwnProps, State> {
	constructor(props: Props & OwnProps) {
		super(props);

		this.state = {
			filterText: '',
			inStockOnly: false,
			selectedProduct: null
		};

		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}

	handleProductSelected(selectedProduct: Product) {
		this.setState({ selectedProduct });
	}

	handleFilterTextChange(filterText: string) {
		this.setState({ filterText });
	}

	handleInStockChange(inStockOnly: boolean) {
		this.setState({ inStockOnly });
	}

	render() {
		const { products, translate } = this.props;
		const { filterText, inStockOnly, selectedProduct } = this.state;

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
							filterText={filterText}
							inStockOnly={inStockOnly}
							selectedProductId={selectedProduct ? selectedProduct.id : ''}
							onProductSelected={this.handleProductSelected}
						/>
					</Col>
					<Col lg={4}>
						{selectedProduct != null && <ProductView product={selectedProduct} />}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default baseConnect(FilterableProductTable,
	() => {
		return {

		};
	},
	{

	}) as React.ComponentType<any>;
