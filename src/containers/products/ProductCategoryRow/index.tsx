import * as React from 'react';

interface Props {
	category: string;
}

const ProductCategoryRow: React.FC<Props> = (props: Props) => {
	const { category } = props;
	return (
		<th colSpan={3}>
			{category}
		</th>
	);
};

export default ProductCategoryRow;
