import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { TranslateFunction } from 'react-localize-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { ApplicationState } from 'actions/redux';
import ProductActions, { productSelector } from 'actions/redux/product';
import { Dispatch } from 'redux';
import { Product } from 'actions/redux/product/interfaces';

interface Props {
	productId: string;
	success: boolean;
	error: boolean;
	initialProduct: Product;
	translate: TranslateFunction;
	createProduct: (product: Product) => void;
	updateProduct: (Product: Product) => void;
}

interface Params {
	id?: string;
}

interface State {
	product: Product;
}

class ProductPage extends React.Component<RouteComponentProps<Params> & Props, State> {
	isNew: boolean;
	submitted: boolean;
	constructor(props: RouteComponentProps<Params> & Props) {
		super(props);

		const { initialProduct } = this.props;
		this.isNew = !initialProduct;
		this.state = {
			product: initialProduct || new Product(),
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		const {
			target: {
				type, name, value
			}
		} = event;
		const { product } = this.state;
		const val = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
		const newProduct = { ...product, [name]: val };

		this.setState({ product: newProduct });
	}

	handleSubmit() {
		const { createProduct, updateProduct } = this.props;
		const { product } = this.state;

		if (this.isNew) {
			createProduct(product);
		} else {
			updateProduct(product);
		}
		this.submitted = true;
	}
	render() {
		const categories = ['food', 'sport', 'electronic'];
		const { productId, translate, success } = this.props;
		const { product } = this.state;
		if (this.submitted && success) {
			return <Redirect push to="/" />;
		}

		return (
			<Container>
				<Row className="justify-content-md-center">
					<form>
						<Row>
							<label className="form-label col-sm-2">{translate('products.id')}:</label>
							{productId}
						</Row>
						<Row>
							<label className="form-label">{translate('products.name')}:</label>
							<input className="form-control" type="text" name="name" value={product.name} onChange={this.handleInputChange} />
						</Row>
						<Row>
							<label className="form-label">{translate('products.group')}:</label>
							<select className="form-control" name="group" value={product.group} onChange={this.handleInputChange}>
								<option> </option>
								{categories.map(
									(group) => (<option key={group} value={group}>{group}</option>)
								)}
							</select>
						</Row>
						<Row>
							<label className="form-label">{translate('products.description')}:</label>
							<textarea className="form-control" name="description" value={product.description} onChange={this.handleInputChange} />
						</Row>
						<Row>
							<label className="form-label">{translate('products.registered')}:</label>
							<input className="form-control" type="date" name="registered" value={product.registered} onChange={this.handleInputChange} />
						</Row>
						<Row>
							<label className="form-label">{translate('products.price')}:</label>
							<input className="form-control" type="text" name="price" value={product.price} onChange={this.handleInputChange} />
						</Row>
						<Row>
							<input type="checkbox" name="isInStock" checked={product.isInStock} onChange={this.handleInputChange} />
							<label> {translate('products.isInStock')}</label>
						</Row>
						<Row>
							<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
								{this.isNew ? translate('products.createProduct') : translate('products.updateProduct')}
							</button>
						</Row>
					</form>
				</Row>
			</Container>
		);
	}
}

export default baseConnect(ProductPage,
	(state: ApplicationState, ownProps: RouteComponentProps<Params>) => {
		const productId = ownProps.match.params.id || '0';
		return {
			productId,
			initialProduct: productSelector.getProduct(state, productId),
			success: productSelector.getSuccess(state),
			error: productSelector.getError(state),
		};
	},
	(dispatch: Dispatch) => {
		return {
			createProduct: (product: Product) => dispatch(ProductActions.createProduct(product)),
			updateProduct: (product: Product) => dispatch(ProductActions.updateProduct(product)),
		};
	});
