import * as React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
	filterText: string;
	idFilterText: string;
	inStockOnly: boolean;
	onFilterTextChange: (text: string) => void;
	onIdFilterTextChange: (text: string) => void;
	onInStockChange: (inStock: boolean) => void;
}

const ProductSearchBar: React.FC<Props> = (props: Props) => {
	const {
		filterText, idFilterText, inStockOnly, onFilterTextChange, onIdFilterTextChange, onInStockChange
	} = props;

	function handleFilterTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		onFilterTextChange(e.target.value.toString());
	}

	function handleIdFilterTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		onIdFilterTextChange(e.target.value);
	}

	function handleInStockChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value: boolean = e.target.checked as any as boolean;
		onInStockChange(value);
	}
	return (
		<Form>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Search By Name And Price..."
					value={filterText}
					onChange={handleFilterTextChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Search By ID"
					value={idFilterText}
					onChange={handleIdFilterTextChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Check
					label="Only show products in stock"
					checked={inStockOnly}
					onChange={handleInStockChange}
				/>
			</Form.Group>
		</Form>
	);
};

export default ProductSearchBar;
