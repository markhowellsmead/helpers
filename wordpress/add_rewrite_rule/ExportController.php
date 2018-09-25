<?php

namespace HowellsMead\Theme\Controller;

/**
 * Configuration for data export
 * 2018-09-25
 *
 * @author Mark Howells-Mead <mark@permanenttourist.ch>
 */

class ExportController
{
	public function run()
	{
		add_action('init', [$this, 'addExportEndpoints']);
		add_filter('query_vars', [$this, 'queryVars'], 10, 1);
		add_action('parse_query', [$this, 'handleExport'], 1, 1);
	}

	public function addExportEndpoints()
	{
		add_rewrite_rule(
			'/(.*?)\/(pdf)$/',
			'index.php?export_customsform=yes',
			'top'
		);
	}

	/**
	 * Add “pdf” as an allowed query variable.
	 * @param array $vars The array of regular query variables to be extended.
	 * @return array The modified array of accepted query variables
	 * *
	 */
	public function queryVars($vars)
	{
		$vars[] = 'export_customsform';
		return $vars;
	}

	/**
	 * Handle the export request.
	 * @param object $wp_query The WordPress query object containing everything you need.
	 * @return void
	 */
	public function handleExport($wp_query)
	{
		if (isset($wp_query->query_vars['export_customsform'])) {
			dump($wp_query->query_vars, 1);
			// output file here
			die('Do your worst!');
		}
	}
}
