<?php

namespace SayHello\Theme\Block;

use DOMDocument;
use DOMXPath;
use WP_Block;

/**
 * Guest Author list
 * Title, text and button are rendered using a
 * combination of InnerBlocks and RichText
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class GuestAuthors
{

	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	/**
	 * Registers the block for server-side rendering
	 * We have to register the title attribute even
	 * though it's not being used server-side, so that
	 * the editor doesn't bork at an invalid attribute.
	 */
	public function register()
	{
		register_block_type('sht/guest-authors', [
			'attributes' => [
				'title' => [
					'type'  => 'string',
				],
			],
			'render_callback' => function (array $attributes, string $content, WP_Block $block) {

				$classNameBase = wp_get_block_default_classname($block->name);

				$users = get_users([
					'meta_key' => 'is_guest_author',
					'meta_value' => 1,
					'order_by' => 'name'
				]);

				ob_start();

				if (empty($users)) {
					echo $content;
				} else {
					libxml_use_internal_errors(true);

					$document = new DOMDocument();
					$document->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));
					$body = $document->getElementsByTagName('body')[0]->childNodes[0];

					foreach ($users as $user) {
						$div = $document->createElement('DIV');
						$div->setAttribute('class', "{$classNameBase}__cell");
						$div->textContent = $user->display_name;
						$body->appendChild($div);
					}

					echo $document->saveHtml($body);
				}

				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
