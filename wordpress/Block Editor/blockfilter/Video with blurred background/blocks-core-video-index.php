<?php

namespace SayHello\Theme\Block;

use DOMDocument;
use DOMXPath;
use getID3;
use WP_Block;

/**
 * Manage single block
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */
class CoreVideo
{

	public function run()
	{
		add_action('render_block_core/video', [$this, 'renderBlock'], 10, 3);
	}

	/**
	 * Add data height and width attributes to video blocks
	 * so that we can control the layout more accurately.
	 * 
	 * Requires Composer dependency james-heinrich/getid3 (1.9)
	 */
	public function renderBlock(string $html, array $block, WP_Block $instance): string
	{

		if (empty($html)) {
			return $html;
		}

		$video_id = $instance->parsed_block['attrs']['id'] ?? null;

		if (!$video_id) {
			return $html;
		}

		// get the file path of the file for the $video_id post
		$video_file_path = get_attached_file($video_id);

		if (!file_exists($video_file_path)) {
			return $html;
		}

		$getID3 = new getID3();

		$fileInfo = $getID3->analyze($video_file_path);

		$width = $fileInfo['video']['resolution_x'];
		$height = $fileInfo['video']['resolution_y'];

		$rotate = (int) ($fileInfo['video']['rotate'] ?? false);

		if ($rotate === 90 || $rotate === 270) {
			$width = $fileInfo['video']['resolution_y'];
			$height = $fileInfo['video']['resolution_x'];
		}

		if ($width > $height) {
			return $html;
		}

		libxml_use_internal_errors(true);
		$document = new DOMDocument();
		$document->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
		$xpath = new DOMXPath($document);

		$nodes = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' wp-block-video ')]");

		if (!$nodes || $nodes->length === 0) {
			return $html;
		}

		foreach ($nodes as $node) {
			$node->setAttribute('data-width', $width);
			$node->setAttribute('data-height', $height);
		}

		$body = $document->saveHtml($document->getElementsByTagName('body')->item(0));
		return str_replace(['<body>', '</body>'], '', $body);
	}
}
