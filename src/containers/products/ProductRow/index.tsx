import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';

interface Props {
	product: Product;
	selected: boolean;
	onProductSelected: (product: Product) => void;
}

const ProductRow: React.FC<Props> = (props: Props) => {
	const { product, selected, onProductSelected } = props;

	function onRowSelected(e: React.MouseEvent) {
		e.preventDefault();
		onProductSelected(product);
	}

	return (
		<tr onClick={onRowSelected} style={{ color: !product.isInStock ? 'red' : '', backgroundColor: selected ? '#9999ab' : '' }}>
			<td>{product.id}</td>
			<td>{product.name}</td>
			<td>{product.price}</td>
		</tr>
	);
};

export default ProductRow;
