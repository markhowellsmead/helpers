/**
 * Get a set of data {title:'a', 'text': 'b', link_text: 'c'} from
 * a custom REST API endpoint. This code deals with a single dataset
 * and will not work if the endpoint returns an array.
 *
 * mark@sayhello.ch 18.4.2024
 *
 */

import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';

const store_name = 'shp_steuerportal/translation-link-options',
	api_endpoint = 'shp_steuerportal/v1/translation-link';

// Some default values
const DEFAULT_STATE = {
		title: '',
		text: '',
		link_text: '',
	},
	DEFAULT_ACTION = {};

// Actions which can be carried out on the data store
const actions = {
	setData(title, text, link_text) {
		return {
			type: 'SET_DATA',
			title,
			text,
			link_text,
		};
	},
	fetchFromAPI(path) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

const store = createReduxStore(store_name, {
	reducer(state = DEFAULT_STATE, action = DEFAULT_ACTION) {
		// Update the state with the fetched values
		switch (action.type) {
			case 'SET_DATA':
				return {
					...state,
					title: action.title,
					text: action.text,
					link_text: action.link_text,
				};
			default:
				return state;
		}
	},

	actions,

	selectors: {
		getPageData(state) {
			return {
				title: state.title,
				text: state.text,
				link_text: state.link_text,
			};
		},
	},

	controls: {
		FETCH_FROM_API(action) {
			// Get the data from the API route
			return apiFetch({ path: action.path });
		},
	},

	resolvers: {
		*getPageData() {
			const response = yield actions.fetchFromAPI(api_endpoint);
			yield actions.setData(response.title, response.text, response.link_text);
		},
	},
});

register(store);
