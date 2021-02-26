<?php

private	function arrayToCsv($data, $delimiter = ',', $enclosure = '"', $escape_char = "\\")
	{
	$f = fopen('php://memory', 'r+');
	foreach ($data as $item) {
		fputcsv($f, $item, $delimiter, $enclosure, $escape_char);
	}
	rewind($f);
	return stream_get_contents($f);
}
