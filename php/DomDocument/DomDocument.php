<?php

namespace SayHello\Theme\Package;

class DomDocument {

   /**
	 * Helper function to allow easy adding an
	 * HTML string to the parent as a child node.
	 *
	 * @param DOMNode $parent
	 * @param string $source
	 * @return void
	 */
	private function appendHTML(DOMNode $parent, string $source)
	{
		$tmpDoc = new DOMDocument();
		$tmpDoc->loadHTML($source);
		foreach ($tmpDoc->getElementsByTagName('body')->item(0)->childNodes as $node) {
			$node = $parent->ownerDocument->importNode($node, true);
			$parent->appendChild($node);
		}
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
