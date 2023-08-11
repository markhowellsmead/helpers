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
}
