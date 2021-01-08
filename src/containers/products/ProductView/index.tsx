import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux/es';
import { Link } from 'react-router-dom';

interface Props {
	product: Product;
	translate: TranslateFunction;
}

const ProductView: React.FC<Props> = (props: Props) => {
	const { product, translate } = props;
	return (
		<Card>
			<Card.Header> {product.name}</Card.Header>
			<Card.Body>
				{product.description}
				<br />
				<Link to={{ pathname: `product/${product.id}` }}> {translate('products.updateProduct')}</Link>
			</Card.Body>
			<Card.Img src={product.picture} />
		</Card>
	);
};

export default ProductView;
