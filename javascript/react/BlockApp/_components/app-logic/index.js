/**
 * In order to use the BLOCK_SCRIPT_SHARED_COMPONENTS constant
 * you need to ensure that it's defined within the task-block-scripts.js file:

   new DefinePlugin({
      BLOCK_SCRIPT_SHARED_COMPONENTS: JSON.stringify(config.scriptsComponentsDir),
   }),
 *
 */

const { apiGet } = require(BLOCK_SCRIPT_SHARED_COMPONENTS + '/api-handling');
const { orderList: apiUrl } = require(BLOCK_SCRIPT_SHARED_COMPONENTS + '/api-urls');
const { nonce } = wpApiSettings;

const useAppLogic = () => {
	const { data, loading, error } = apiGet(apiUrl, nonce);

	return {
		data,
		error,
		loading,
	};
};

export default useAppLogic;
