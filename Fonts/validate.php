<?php
/**
 * Validate a font file
 * The script reads the MIME type of the file and responds accordingly.
 * It doesn't pay any attention to the file name.
 * It doesn't check to see whether the file is corrupt or not.
 *
 * Since 11.10.2016 permanent.tourist@gmail.com
 */
$fileName = 'file.ext';
$mimeTypes = array(
    'application/vnd.ms-fontobject' => 'EOT',
    'application/font-sfnt' => 'OTF',
    'image/svg+xml' => 'SVG',
    'application/font-sfnt' => 'TTF',
    'application/font-woff' => 'WOFF',
);

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $fileName);
if (array_key_exists($mime, $mimeTypes)) {
    echo 'font file: '.$mimeTypes[$mime];
} else {
    echo 'not a font: '.$mime;
}
finfo_close($finfo);
