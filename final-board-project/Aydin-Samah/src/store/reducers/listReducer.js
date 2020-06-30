import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	lists: [
		{
			id: uuidv4(),
			title: '',
			isSelected: false,
			isCompleted: false,
			items: [
				{
					name: '',
					amount: 0,
				},
			],
		},
	],
};

const listReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_LIST:
			console.log('created List', action.list);
			return state;
		case actionTypes.ADD_ITEM:
			console.log('Added item', action);
			return state;
		case actionTypes.REMOVE_ITEM:
			console.log('item removed', action);
			return state;
		case actionTypes.EDIT_ITEM:
			console.log('item edited', action);
			return state;
		case actionTypes.COMPLETED_LIST:
			console.log('created completed lists', action);
			return state;
		case actionTypes.ADD_ITEM_TO_COMPLETED_LIST:
			console.log('added item tp completed lists', action);
			return state;
		case actionTypes.DELETE_DOCUMENT:
			console.log('document deleted', action);
			return state;
		case actionTypes.ERROR_DELETE_DOCUMENT:
			console.log('Error');
			return state;
		default:
			return state;
	}
};

export default listReducer;
