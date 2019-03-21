<?php

// Split the_content into columns.
// 21.3.2019 for a PDF output where CSS Columns wasn't possible

$content = '<?xml encoding="utf-8" ?>' . apply_filters( 'the_content', get_post_field( 'post_content', get_the_ID() ) );

$doc           = new DOMDocument();
$doc->encoding = 'UTF-8';
$doc->loadHTML( $content );

$columns        = [ '' ];
$current_column = 0;
$chars          = 0;
$chars_limit    = 0;
$body           = $doc->getElementsByTagName( 'body' )->item( 0 );

if ( $body && $body->childNodes ) {

	foreach ( $body->childNodes as $node ) {
		$chars_limit += strlen( $node->nodeValue );
	}

	$chars_limit = $chars_limit / 4;

	foreach ( $body->childNodes as $node ) {
		if ( $node instanceof DOMElement ) {
			$chars                      += strlen( $node->nodeValue );
			$columns[ $current_column ] .= sht_theme()->PdfTools->pdfNodeOuterHTML( $node );
			if ( $chars > $chars_limit ) {
				$current_column++;
				if ( ! isset( $columns[ $current_column ] ) ) {
					$columns[ $current_column ] = '';
					$chars                      = 0;
				}
			}
		}
	}

	foreach ( $columns as &$column ) {
		$column = '<div class="pdf__contentcolumn">' . $column . '</div>';
	}
	printf( '<div class="pdf__contentcolumns">%s</div>', implode( '', $columns ) );
}
