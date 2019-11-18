<?php

namespace SayHello\Theme\Package;

use DOMDocument;
use DOMXpath;

/**
 * Footnotes stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Footnotes
{

	public function run()
	{
		add_filter('the_content', [$this, 'addFootnoteAnchors']);
	}

	public function addFootnoteAnchors($content)
	{
		if (has_block('sht/footnotes')) {
			libxml_use_internal_errors(true);
			$domDocument = new DOMDocument();
			$domDocument->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));

			$xpath = new DOMXpath($domDocument);
			$blocks = $xpath->query("//div[contains(concat(' ',normalize-space(@class),' '),' b-footnotes ')]");

			$iterator = 0;

			foreach ($blocks as $block) {
				$paragraphs = $xpath->query('p', $block);
				if ($paragraphs) {
					foreach ($paragraphs as $paragraph) {
						$iterator++;
						$paragraph->setAttribute('id', 'fussnote'.$iterator);
						$paragraph->setAttribute('class', 'b-footnote');
					}
				}
			}
			$content = $domDocument->saveHtml();
		}
		return $content;
	}
}
