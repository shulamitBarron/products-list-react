import * as React from 'react';
import { TranslateFunction } from 'react-localize-redux';
import ProductView from 'common-components/business/ProductView';
import { OrderProduct } from 'actions/redux/orders/interfaces';

interface Props {
	item: OrderProduct;
	translate: TranslateFunction;
}

const OrderItem: React.FC<Props> = ({ item, translate }: Props) => {
	return (
		<div className="col-4 p-4">
			<div><b>Product ID:</b> {item.id}</div>
			<div><b>Quantity:</b> {item.quantity}</div>
			{item.product && <ProductView translate={translate} product={item.product} isEditble={false} />}
		</div>
	);
};

export default OrderItem;
