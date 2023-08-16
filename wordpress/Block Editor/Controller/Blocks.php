<?php

namespace SayHello\Theme\Controller;

use WP_Block;

/**
 * Handles generic block stuff
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */

class Block
{
	private function basicClasses($attributes)
	{
		$class_names = [];
		$attributes = (array) $attributes;

		if (!empty($attributes['align'] ?? '')) {
			$class_names[] = "align{$attributes['align']}";
		}

		if (!empty($attributes['className'] ?? '')) {
			$class_names[] = $attributes['className'];
		}

		if (!empty($attributes['backgroundColor'] ?? '')) {
			$class_names[] = "has-background";
			$class_names[] = "has-{$attributes['backgroundColor']}-background-color";
		}

		if (!empty($attributes['textColor'] ?? '')) {
			$class_names[] = "has-text-color";
			$class_names[] = "has-{$attributes['textColor']}-color";
		}

		if (!empty($attributes['gradient'] ?? '')) {
			$class_names[] = "has-background";
			$class_names[] = "has-{$attributes['gradient']}-gradient-background";
		}

		if (!empty($attributes['fontSize'] ?? '')) {
			$class_names[] = "has-{$attributes['fontSize']}-font-size";
		}

		return array_unique($class_names);
	}

	public function classNames($block)
	{

		// ACF block
		if (isset($block['acf_block_version'])) {
			return implode(' ', array_merge([$block['sht']['classNameBase']], $this->basicClasses($block)));
		}

		// Core block
		return implode(' ', array_merge([$block['sht']['classNameBase']], $this->basicClasses($block['attributes'])));
	}

	/**
	 * Add custom rendering data to the block
	 * Pass block by reference - no return
	 *
	 * @param array|WP_Block $block
	 * @return void
	 */
	public function extend(&$block, $block_attributes = [])
	{

		// Convert object type in order to maintain extender compatibility
		// The incoming object is an array or a WP_Block, depending on whether
		// it's been registered using Core or ACF.
		$block = (array) $block;
		$attributes = $block['attributes'] ?? [];

		if (!isset($block['sht'])) {
			$block['sht'] = [];
		}

		$block['sht']['classNameBase'] = wp_get_block_default_classname($block['name']);
		$block['sht']['class_names'] = $this->classNames($block);

		$block['sht']['selectedColorClasses'] = [];

		if (!empty($attributes['backgroundColor'] ?? '')) {
			$block['sht']['selectedColorClasses'][] = "has-background";
			$block['sht']['selectedColorClasses'][] = "has-{$attributes['backgroundColor']}-background-color";
		}

		if (!empty($attributes['textColor'] ?? '')) {
			$block['sht']['selectedColorClasses'][] = "has-text-color";
			$block['sht']['selectedColorClasses'][] = "has-{$attributes['textColor']}-text-color";

			$block['sht']['textColorClasses'][] = "has-text-color";
			$block['sht']['textColorClasses'][] = "has-{$attributes['textColor']}-text-color";
		}

		$block['sht']['margins'] = [];
		$block['sht']['styles_string'] = '';

		if (!empty($block_attributes['style']['spacing']['margin'] ?? [])) {
			foreach ($block_attributes['style']['spacing']['margin'] as $edge => $margin) {
				$margin_bits = explode('|', $margin);
				$size = $margin_bits[count($margin_bits) - 1];
				$block['sht']['margins']["margin-{$edge}"] = "var(--wp--preset--spacing--{$size})";
			}
		}

		if (!empty($block['sht']['margins'])) {
			foreach ($block['sht']['margins'] as $property => $value) {
				$block['sht']['styles_string']  .= $property . ':' . $value . ';';
			}
		}
	}
}

/**
 * Plugin equivalent of get_template_part()
 * Usage: $class_object->renderBlock(
 *
 * @param string $name
 * @param array $args
 * @return void
 */
public function renderBlock(string $name, array $args = []): void
{
	$dir = shp_propertyowner_banners_get_instance()->dir;
	$render_path = "{$dir}/src/Blocks/{$name}/render.php";

	if (!isset($args['classNameBase'])) {
		$block_json = json_decode(file_get_contents("{$dir}/src/Blocks/{$name}/block.json"));

		$key = preg_replace('/\//', '-', $block_json->name);
		$key = "wp-block-{$key}";
		$args['classNameBase'] = wp_get_block_default_classname($block_json->name);
	}

	if (!isset($args['manualRender'])) {
		$args['manualRender'] = true;
	}

	// https://developer.wordpress.org/reference/functions/load_template/
	@load_template($render_path, false, $args);
}
