import { Action } from 'redux';
import { Product } from '../product/interfaces';

export interface OrderState {
	orders: Order[];
}

export enum TypesNames {
	GET_ORDERS = 'GET_ORDERS',
	SET_ORDERS = 'SET_ORDERS',
}

export interface ActionCreator {
	getOrders: () => Action<TypesNames.GET_ORDERS>;
	setOrders: (orders: Order[]) => SetOrdersAction;
}

export interface SetOrdersAction extends Action<TypesNames.SET_ORDERS> {
	orders: Order[];
}

export interface OrderProduct {
	id: string;
	quantity: number;
	product?: Product;
}

export class Order {
	orderNum: string;
	date: string;
	address: string;
	deliveryMethod: string;
	status: string;
	total: number;
	paymentMethod: string;
	items: OrderProduct[];
}
