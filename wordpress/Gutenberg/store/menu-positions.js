import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

const route = 'sht/menu-positions';

const actions = {
    setEntries(entries) {
        return {
            type: 'SET_ENTRIES',
            entries,
        };
    },
    getEntries(path) {
        return {
            type: 'GET_ENTRIES',
            path,
        };
    },
};

registerStore(route, {
    reducer(state = { entries: {} }, action) {
        switch (action.type) {
            case 'SET_ENTRIES':
                return {
                    ...state,
                    entries: action.entries,
                };
        }

        return state;
    },

    actions,

    selectors: {
        getEntries(state) {
            const { entries } = state;
            return entries;
        },
    },

    controls: {
        GET_ENTRIES(action) {
            return apiFetch({ path: action.path });
        },
    },

    resolvers: {
        *getEntries() {
            const entries = yield actions.getEntries(`/${route}/`);
            return actions.setEntries(entries);
        },
    },
});
