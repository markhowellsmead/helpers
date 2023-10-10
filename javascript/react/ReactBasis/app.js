import { createRoot } from '@wordpress/element';

const App = ({ element }) => {
	const { translations } = shp_propertyowner_idx_admin;

	return <h1 dangerouslySetInnerHTML={{ __html: translations.helloworld }} />;
};

const element = document.querySelector('[data-shp-idx-export]');

if (element) {
	const root = createRoot(element);
	root.render(<App element={element} />);
}
