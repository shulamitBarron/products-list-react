import React from 'react';
import { shallow } from 'enzyme';
import { Card, Button } from 'react-bootstrap';
import ProductView from '../index';

const product = {
	id: '5ff81abb0e750ff69443daf8',
	isInStock: true,
	price: '3554.61',
	picture: 'http://placehold.it/32x32',
	name: 'Hewitt',
	group: 'sport',
	description: 'Officia adipisicing velit anim deserunt officia est qui excepteur ullamco laborum.',
	registered: '2018-12-14 15:32:56'
};

describe('ProductView', () => {
	it('should render component', () => {
		const tree = shallow(<ProductView product={product} deleteProduct={jest.fn()} translate={jest.fn()} />);
		expect(tree).toMatchSnapshot();
	});

	it('should render with correct childern', () => {
		const tree = shallow(<ProductView product={product} deleteProduct={jest.fn()} translate={jest.fn()} />);

		expect(tree.find(Card.Header).text()).toBe('Hewitt');
	});

	it('should call deleteProduct', () => {
		const deleteProduct = jest.fn();
		const tree = shallow(<ProductView product={product} deleteProduct={deleteProduct} translate={jest.fn()} />);

		tree.find(Button).simulate('click');
		expect(deleteProduct).toHaveBeenCalledWith('5ff81abb0e750ff69443daf8');
	});
});
