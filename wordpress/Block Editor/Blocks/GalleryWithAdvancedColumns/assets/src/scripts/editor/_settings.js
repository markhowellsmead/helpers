export const SETTINGS_COLUMN_1 = {
	colArea: { mobile: { v: 'auto', o: true }, all: { v: '1/1/3/3', o: true }, tablet: { v: '1/1/3/3', o: true } },
	padding: {
		mobile: {
			v: {
				top: { v: null, custom: true },
				right: { v: null, custom: true },
				bottom: { v: null, custom: true },
				left: { v: null, custom: true },
			},
			unlink: false,
			o: true,
		},
	},
	blockGap: { all: { v: 'medium', custom: false, o: '' } },
};

export const SETTINGS_COLUMN_2 = {
	colArea: { mobile: { v: 'auto', o: true }, all: { v: '1/3/2/4', o: true }, tablet: { v: '1/3/2/4', o: true } },
	padding: {
		mobile: {
			v: {
				top: { v: null, custom: true },
				right: { v: null, custom: true },
				bottom: { v: null, custom: true },
				left: { v: null, custom: true },
			},
			unlink: false,
			o: true,
		},
	},
	contentLayout: { all: { v: { type: 'stack', allowWrap: false, justifyContent: 'start', contentSize: '' }, o: '' } },
	blockGap: { all: { v: 'medium', custom: false, o: '' } },
};

export const SETTINGS_COLUMN_3 = {
	colArea: { mobile: { v: 'auto', o: true }, all: { v: '2/3/3/4', o: true }, tablet: { v: '2/3/3/4', o: true } },
	padding: {
		mobile: {
			v: {
				top: { v: null, custom: true },
				right: { v: null, custom: true },
				bottom: { v: null, custom: true },
				left: { v: null, custom: true },
			},
			unlink: false,
			o: true,
		},
	},
	contentLayout: { all: { v: { type: 'stack', allowWrap: false, justifyContent: 'start', contentSize: '' }, o: '' } },
	blockGap: { all: { v: 'medium', custom: false, o: '' } },
};

export const SETTINGS_COLUMNS = {
	align: 'wide',
	gridMode: { mobile: { v: 'fixed', o: true }, all: { v: 'fixed', o: '' }, tablet: { v: 'fixed', o: true } },
	gap: {
		mobile: {
			v: { column: { v: 'medium', custom: false }, row: { v: 'medium', custom: false } },
			unlink: false,
			o: true,
		},
		all: { o: true, v: { column: { v: 'medium', custom: false }, row: { v: 'medium', custom: false } } },
	},
	grid: {
		mobile: { v: { cols: 1, rows: 2 }, o: true },
		all: { o: '', v: { cols: 3, rows: 2 } },
		tablet: { o: true, v: { cols: 3, rows: 2 } },
	},
	padding: {
		mobile: {
			v: {
				top: { v: null, custom: true },
				right: { v: null, custom: true },
				bottom: { v: null, custom: true },
				left: { v: null, custom: true },
			},
			unlink: false,
			o: true,
		},
	},
	rowHeight: { mobile: { v: 'auto', o: true } },
	fluidLogic: { all: { v: 'auto-fit', o: '' }, tablet: { o: true } },
	colMinWidth: { all: { v: '', o: '' }, tablet: { o: true } },
	customGridLayout: {
		all: { v: { cols: '1fr 1fr 1fr', rows: 'auto auto' }, o: true },
		tablet: { v: { cols: '1fr 1fr 1fr', rows: 'auto auto' }, o: true },
		mobile: { v: { cols: '1fr', rows: 'auto auto' }, o: true },
	},
};
