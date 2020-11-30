import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';
import { Card } from 'react-bootstrap';

interface Props {
	product: Product;
}

const ProductView: React.FC<Props> = (props: Props) => {
	const { product } = props;
	return (
		<Card>
			<Card.Header> {product.name}</Card.Header>
			<Card.Body>{product.description}</Card.Body>
			<Card.Img src={product.picture} />
		</Card>
	);
};

export default ProductView;
