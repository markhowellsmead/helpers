/**
 * Specifically for WordPress projects
 * 
 * Last update 11.9.2024
 *
 */

import { useEffect, useState } from '@wordpress/element';
import apiStates from './_states.js';

const apiGet = (url) => {
	const [api_data, setAPIData] = useState({
		state: apiStates.LOADING,
		error: '',
		data: [],
		headers: {},
	});

	let header_total = null;

	const setPartData = (partialData) =>
		setAPIData((prevData) => ({
			...prevData,
			...partialData,
		}));

	useEffect(() => {
		setPartData({
			state: apiStates.LOADING,
		});

		// Using native fetch for getting both headers and JSON response
		fetch(url)
			.then((response) => {
				// Check if the response is ok
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// Extracting headers (e.g., X-WP-Total)
				header_total = response.headers.get('X-WP-Total');

				// Parsing the JSON data
				return response.json();
			})
			.then((json) => {
				// Set the data and the headers
				setPartData({
					state: apiStates.SUCCESS,
					data: json,
					headers: {
						total: header_total,
					},
				});
			})
			.catch((error) => {
				setPartData({
					state: apiStates.ERROR,
					error: error.message || 'fetch failed',
				});
			});
	}, [url]);

	return api_data;
};

const getPosts = (url) => {
	const [state, setState] = useState(apiStates.IDLE);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const fetchData = async (page = 1, allData = []) => {
		try {
			const this_url = new URL(url);
			this_url.searchParams.append('page', page);
			const response = await fetch(this_url);

			// Check if the response is ok
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Get the necessary headers
			const totalPages = response.headers.get('X-WP-TotalPages');

			// Parse the response JSON
			const json = await response.json();

			// Combine the current page data with all previous data
			const updatedData = [...allData, ...json];

			// If there are more pages, recursively fetch the next page
			if (page < totalPages) {
				return fetchData(page + 1, updatedData);
			}

			// If all pages are fetched, return the full data
			return updatedData;
		} catch (err) {
			throw err;
		}
	};

	const doRequest = async () => {
		setState(apiStates.LOADING);

		try {
			const allPosts = await fetchData(); // Fetch all pages of data
			setState(apiStates.SUCCESS);
			setData(allPosts); // Set the combined data
		} catch (err) {
			setState(apiStates.ERROR);
			setError(err.message || 'fetch failed');
		}
	};

	return {
		state,
		data,
		error,
		doRequest,
		setState,
		setData,
	};
};

export { apiStates, apiGet, getPosts };
