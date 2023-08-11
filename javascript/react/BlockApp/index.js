import { createRoot } from '@wordpress/element';

import useAppLogic from './_components/app-logic';

const App = ({ element: { dataset } }) => {
	const { pluginKey, links, translations, isLoggedIn } = shp_adrotech_orders_order_list;
	const { data, error, loading } = useAppLogic();

	console.log('isLoggedIn', isLoggedIn);
	console.log('error', error);
	console.log('data', data);

	return (
		<div>
			<h1>List</h1>
		</div>
	);
};

const element = document.querySelector('[data-example-block]');

if (element) {
	const root = createRoot(element);
	root.render(<App element={element} />);
}
