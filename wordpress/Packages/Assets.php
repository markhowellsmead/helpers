<?php

/**
 * Asset loading and management
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 * @since 17.1.2025
 */

namespace SayHello\SteuerportalAlgoliasearch\Controller;

class Assets
{

	private $key = '';
	private $file = '';
	private $path = '';
	private $uri = '';

	/**
	 * Run the controller
	 *
	 * @param string $file The main plugin file
	 * @param string $key The plugin key
	 * @return void
	 */
	public function run(string $file, string $key): void
	{

		$this->key = $key;
		$this->file = $file;
		$this->path = untrailingslashit(plugin_dir_path($this->file));
		$this->uri = untrailingslashit(plugin_dir_url($this->file));

		add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
	}

	/**
	 * Enqueue asset files
	 *
	 * @return void
	 */
	public function enqueueScripts(): void
	{
		$script_path = "/assets/scripts/search.js";
		$asset_path = "/assets/scripts/searchasset.php";

		$script_url = "{$this->uri}{$script_path}";
		$script_path = "{$this->path}{$script_path}";
		$script_asset_path = "{$this->path}{$asset_path}";

		$script_asset = file_exists($script_asset_path) ? require($script_asset_path) : ['dependencies' => [], 'version' => filemtime($script_path)];

		wp_enqueue_script(
			"{$this->key}--search",
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version']
		);
	}

	/**
	 * Load a script with dependencies
	 *
	 * @param string $filename
	 * @param string $key
	 * @return void
	 * @since 20.3.2025
	 */
	public function loadScriptWithDependencies(string $filename, string $key): void
	{
		$directory = get_template_directory();
		$directory_uri = get_template_directory_uri();
		$prefix = sht_theme()->prefix;

		$script_asset_path = "{$directory}/assets/scripts/{$filename}.asset.php";

		if (!file_exists($script_asset_path)) {
			wp_die("{$script_asset_path} does not exist", 500);
		}

		$script_asset = require($script_asset_path);

		wp_enqueue_script(
			"{$prefix}-{$key}",
			"{$directory_uri}/assets/scripts/{$filename}.js",
			$script_asset['dependencies'],
			$script_asset['version']
		);
	}
}
