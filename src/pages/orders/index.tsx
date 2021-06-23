import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { TranslateFunction } from 'react-localize-redux';
import { Container } from 'react-bootstrap';
import OrderListTable from 'containers/orders/OrderListTable';

interface Props {
	translate: TranslateFunction;
}

class OrderList extends React.Component<Props> {
	render() {
		const { translate } = this.props;
		
		return (
			<Container>
				<h1>{translate('orders.title')}</h1>
				<OrderListTable />
			</Container>
		);
	}
}

export default baseConnect(OrderList, () => { return {}; }, () => { return {}; });
