import * as React from 'react';
import { Order } from 'actions/redux/orders/interfaces';
import moment from 'moment';
import { TranslateFunction } from 'react-localize-redux';
import OrderItem from '../OrderItem';

interface Props {
	order: Order;
	translate: TranslateFunction;
}

interface State {
	expanded: boolean;
}

class OrderRow extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			expanded: false
		};
	}

	toggleExpan = () => {
		this.setState((prev) => ({ expanded: !prev.expanded }));
	};

	render() {
		const { order, translate } = this.props;
		const { expanded } = this.state;

		return (
			<>
				<tr>
					<td>
						<button type="button" onClick={this.toggleExpan} className="btn">
							{expanded ? '-' : '+'}
						</button>
					</td>
					<td>
						{order.orderNum}
					</td>
					<td>
						{moment(order.date).format('YYYY/MM/DD')}
					</td>
					<td>
						{order.address}
					</td>
					<td>
						{order.deliveryMethod}
					</td>
					<td>
						{order.status}
					</td>
					<td>
						{order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
					</td>
				</tr>
				{
					expanded && (
						<tr>
							<td colSpan={8} className="border">
								<div className="row overflow-auto" style={{ maxHeight: 400 }}>
									{order.items.map((item) => <OrderItem key={item.id} translate={translate} item={item} />)}
								</div>
							</td>
						</tr>
					)
				}
			</>
		);
	}
}

export default OrderRow;
