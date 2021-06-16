import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'react-bootstrap';
import ProductTable from '../index';
import ProductCategoryRow from '../../ProductCategoryRow';
import ProductRow from '../../ProductRow';

const products = [
	{
		id: '5ff81abbe6ab17fd4601c5d8',
		isInStock: true,
		price: '2638.28',
		picture: 'http://placehold.it/32x32',
		name: 'Bray',
		group: 'sport',
		description: 'Minim enim mollit ea id dolor duis irure in.',
		registered: '2016-03-27 20:32:49'
	},
	{
		id: '5ff81abb0e750ff69443daf8',
		isInStock: true,
		price: '3554.61',
		picture: 'http://placehold.it/32x32',
		name: 'Hewitt',
		group: 'sport',
		description: 'Officia adipisicing velit anim deserunt officia est qui excepteur ullamco laborum.',
		registered: '2018-12-14 15:32:56'
	}
];

describe('ProductTable', () => {
	it('should render component', () => {
		const tree = shallow(<ProductTable products={products} onProductSelected={jest.fn()} translate={jest.fn()} selectedProductId="" />);

		expect(tree).toMatchSnapshot();
	});

	it('should render with correct childern', () => {
		const tree = shallow(<ProductTable products={products} onProductSelected={jest.fn()} translate={jest.fn()} selectedProductId="" />);

		expect(tree.find(Table).exists).toBeTruthy();

		expect(tree.find(ProductCategoryRow).length).toBe(1);
		expect(tree.find(ProductCategoryRow).first().props().category).toBe('sport');

		expect(tree.find(ProductRow).length).toBe(2);
		expect(tree.find(ProductRow).at(0).props().product).toBe(products[0]);
		expect(tree.find(ProductRow).at(1).props().product).toBe(products[1]);
	});

	it('should render empty table', () => {
		const tree = shallow(<ProductTable products={[]} onProductSelected={jest.fn()} translate={jest.fn()} selectedProductId="" />);

		expect(tree.find(Table).exists).toBeTruthy();

		expect(tree.find(ProductCategoryRow).length).toBe(0);
		expect(tree.find(ProductRow).length).toBe(0);
	});

	it('should call onProductSelected', () => {
		const onProductSelected = jest.fn();
		const tree = shallow(<ProductTable products={products} onProductSelected={onProductSelected} translate={jest.fn()} selectedProductId="" />);

		tree.find(ProductRow).first().props().onProductSelected(products[0]);
		expect(onProductSelected).toHaveBeenCalledWith(products[0]);
	});

	it('should send correct selected product', () => {
		const tree = shallow(<ProductTable products={products} onProductSelected={jest.fn()} translate={jest.fn()} selectedProductId="5ff81abbe6ab17fd4601c5d8" />);

		expect(tree.find(ProductRow).length).toBe(2);
		expect(tree.find(ProductRow).at(0).props().selected).toBe(true);
		expect(tree.find(ProductRow).at(1).props().selected).toBe(false);
	});
});
