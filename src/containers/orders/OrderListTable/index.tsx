import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { TranslateFunction } from 'react-localize-redux';
import { ApplicationState } from 'actions/redux';
import { Dispatch } from 'redux';
import OrderActions, { ordersSelector } from 'actions/redux/orders';
import { Order } from 'actions/redux/orders/interfaces';
import { Table } from 'react-bootstrap';
import OrderRow from '../OrderRow';

interface Props {
	orders: Order[];
	getOrdersList: () => VoidFunction;
	translate: TranslateFunction;
}

class OrderListTable extends React.Component<Props> {
	componentDidMount() {
		const { getOrdersList } = this.props;
		getOrdersList();
	}

	render() {
		const { translate, orders } = this.props;
		return (
			<Table>
				<thead>
					<tr>
						<th> </th>
						<th>{translate('orders.orderNum')}</th>
						<th>{translate('orders.date')}</th>
						<th>{translate('orders.address')}</th>
						<th>{translate('orders.deliveryMethod')}</th>
						<th>{translate('orders.status')}</th>
						<th>{translate('orders.total')}</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => <OrderRow key={order.orderNum} translate={translate} order={order} />)}
				</tbody>
			</Table>
		);
	}
}

export default baseConnect(OrderListTable,
	(state: ApplicationState) => {
		return {
			orders: ordersSelector.getDetailedOrders(state)
		};
	},
	(dispatch: Dispatch) => {
		return {
			getOrdersList: () => dispatch(OrderActions.getOrders()),
		};
	});
