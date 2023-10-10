<?php

class Package {

    public function run()
	{
		add_action('admin_enqueue_scripts', [$this, 'enqueueAssets']);
	}

    …

    public function enqueueAssets(string $hook)
  	{
  
  		if ($hook !== 'tools_page_EXAMPLE') {
  			return;
  		}
  
  		$min = !defined('WP_DEBUG') || !WP_DEBUG ? '.min' : '';
  
  		$loader_script = "/assets/scripts/admin{$min}.js";
  		$filemtime = filemtime(EXAMPLE_get_instance()->dir . $loader_script);
  		$script_asset_path = EXAMPLE_get_instance()->dir . '/assets/scripts/admin.asset.php';
  		$script_asset = file_exists($script_asset_path) ? require($script_asset_path) : ['dependencies' => [], 'version' => $filemtime];
  
  		wp_enqueue_script('EXAMPLE_admin', EXAMPLE_get_instance()->url . $loader_script, $script_asset['dependencies'], $script_asset['version'], true);
  		wp_localize_script('EXAMPLE_admin', 'EXAMPLE_admin', [
  			'api' => [
  				'root' => esc_url_raw(rest_url()),
  				'nonce' => wp_create_nonce('wp_rest'),
  			],
  			'translations' => [
  				'helloworld' => _x('Hello world', 'Example translation', 'sha')
  			],
  			'version' => $filemtime,
  			'url' => EXAMPLE_get_instance()->url,
  			'min' => $min ? 1 : 0,
  			'debug' => $min ? 0 : 1,
  		]);
  	}
}
