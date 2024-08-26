<?php

namespace SayHello\MustUsePlugin\Blocks\CoreGroup;

use DOMDocument;
use WP_Block;

class Block
{
	public function run()
	{
		add_action('render_block_core/group', [$this, 'renderBlock'], 10, 3);
	}

	public function renderBlock(string $content, array $block, WP_Block $instance)
	{
		$url = $block['attrs']['url'] ?? false;

		if (!$url) {
			return $content;
		}

		$content = $this->convertStringEncoding($content);

		$document = new DOMDocument();
		libxml_use_internal_errors(true);
		$document->loadHTML($content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

		$link = $document->createElement('a');
		$link->setAttribute('href', $url);
		$link->setAttribute('class', 'wp-block-group__floodlink');
		$firstChild = $document->documentElement->firstChild;
		$firstChild->parentNode->insertBefore($link, $firstChild);

		$document->documentElement->setAttribute('class', $document->documentElement->getAttribute('class') . ' wp-block-group--has-floodlink');

		$body = $document->saveHtml($document->getElementsByTagName('body')->item(0));
		return str_replace(['<body>', '</body>'], '', $body);
	}

	/**
	 * PHP 8.2-compatible string conversion.
	 * Formerly mb_convert_encoding($string, 'HTML-ENTITIES', 'UTF-8')
	 *
	 * @param string $string
	 * @param string $convert_to
	 * @return string
	 */
	private function convertStringEncoding(string $string, $convert_to = 'UTF-8')
	{
		return mb_encode_numericentity(
			htmlspecialchars_decode(
				htmlentities(
					$string,
					ENT_NOQUOTES,
					$convert_to,
					false
				),
				ENT_NOQUOTES
			),
			[0x80, 0x10FFFF, 0, ~0],
			$convert_to
		);
	}
}
