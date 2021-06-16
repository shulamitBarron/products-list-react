import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';
import { Card, Button } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux/es';
import { Link } from 'react-router-dom';

interface Props {
	product: Product;
	translate: TranslateFunction;
	deleteProduct: (id: string) => void;
}

const ProductView: React.FC<Props> = (props: Props) => {
	const { product, translate, deleteProduct } = props;

	const handleDelete = () => {
		deleteProduct(product.id);
	};

	return (
		<Card>
			<Card.Header>{product.name}</Card.Header>
			<Card.Body>
				{product.description}
				<br />
				<Link to={{ pathname: `product/${product.id}` }}> {translate('products.updateProduct')}</Link>
				<br />
				<Button onClick={handleDelete}>{translate('products.deleteProduct')}</Button>
			</Card.Body>
			<Card.Img src={product.picture} />
		</Card>
	);
};

export default ProductView;
