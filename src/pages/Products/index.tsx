import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { TranslateFunction } from 'react-localize-redux';

import { Container } from 'react-bootstrap';
import FilterableProductTable from 'containers/products/FilterableProductTable';

interface Props {
	translate: TranslateFunction;
}

class Products extends React.Component<Props> {
	render() {
		return (
			<Container>
				<h1>Product List</h1>
				<FilterableProductTable />
			</Container>
		);
	}
}

export default baseConnect(Products, () => { return {}; }, () => { return {}; });

