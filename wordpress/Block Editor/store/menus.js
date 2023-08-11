import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';

// Some default values
const DEFAULT_STATE = {
		entries: false,
	},
	DEFAULT_ACTION = {};

// Actions which can be carried out on the data store
const actions = {
	setState(item, entries) {
		return {
			type: 'GET_ENTRIES',
			item,
			entries,
		};
	},
	fetchFromAPI(path) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

// Use as wp.data.select("sht/menu-positions")
const store = createReduxStore('sht/menu-positions', {
	reducer(state = DEFAULT_STATE, action = DEFAULT_ACTION) {
		// Update the state with the fetched value
		switch (action.type) {
			case 'GET_ENTRIES':
				const updated_state = {
					...state,
					entries: action.entries,
				};
				return updated_state;
		}

		return state;
	},

	actions,

	selectors: {
		getEntries(state, item) {
			// Get the value from the state object
			const { entries } = state;
			return entries;
		},
	},

	controls: {
		FETCH_FROM_API(action) {
			// Get the data from the API route
			return apiFetch({ path: action.path });
		},
	},

	resolvers: {
		*getEntries(item) {
			// Get the results from the API and update the state object.
			const path = '/sht/menu-positions/';
			const entries = yield actions.fetchFromAPI(path);
			return actions.setState(item, entries);
		},
	},
});

register(store);
