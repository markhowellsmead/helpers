<?php

/*
 * Calculates a human-readable file size for the specified file
 * mhm 20.4.2018… but not exactly unique ;)
 */
 
// Regular PHP 
function humanReadableFileSize($bytes, $decimals = 2)
{
	$size = [' B.',' Kb.',' Mb.',' Gb.',' Tb.',' Pb.'];
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$size[$factor];
}

// Version with Gettext translation option (for Wordpress)
function humanReadableFileSize($bytes, $decimals = 2)
{
	$size = [
		_x(' B.', 'File size suffix', 'translationkey'), 
		_x(' Kb.', 'File size suffix', 'translationkey'), 
		_x(' Mb.', 'File size suffix', 'translationkey'), 
		_x(' Gb.', 'File size suffix', 'translationkey'), 
		_x(' Tb.', 'File size suffix', 'translationkey'), 
		_x(' Pb.', 'File size suffix', 'translationkey')
	];
	$factor = floor((strlen($bytes) - 1) / 3);
	return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$size[$factor];
}
