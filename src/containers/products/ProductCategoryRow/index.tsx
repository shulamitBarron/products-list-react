import * as React from 'react';

interface Props {
	category: string;
}

const ProductCategoryRow: React.FC<Props> = (props: Props) => {
	const { category } = props;
	return (
		<tr>
			<th colSpan={3}>
				{category}
			</th>
		</tr>
	);
};

export default ProductCategoryRow;
