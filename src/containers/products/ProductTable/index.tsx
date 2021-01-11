import { Product } from 'actions/redux/product/interfaces';
import * as React from 'react';
import { Table } from 'react-bootstrap';
import { TranslateFunction } from 'react-localize-redux';
import ProductCategoryRow from '../ProductCategoryRow';
import ProductRow from '../ProductRow';

interface Props {
	products: Product[];
	translate: TranslateFunction;
	onProductSelected: (product: Product) => void;
	selectedProductId: string;
}

const ProductTable: React.FC<Props> = (props: Props) => {
	const {
		products, onProductSelected, selectedProductId, translate
	} = props;

	function renderRows(): JSX.Element[] {
		let prevCategory: string;
		const rows: JSX.Element[] = [];
		products.forEach((product: Product) => {
			if (prevCategory !== product.group) {
				prevCategory = product.group;
				rows.push(<ProductCategoryRow key={product.group} category={product.group} />);
			}
			rows.push(<ProductRow onProductSelected={onProductSelected} selected={product.id === selectedProductId} key={product.id} product={product} />);
		});

		return rows;
	}

	return (
		<Table>
			<thead>
				<tr>
					<th>#</th>
					<th>{translate('products.name')}</th>
					<th>{translate('products.price')}</th>
				</tr>
			</thead>
			<tbody>
				{renderRows()}
			</tbody>
		</Table>
	);
};

export default React.memo(ProductTable);
