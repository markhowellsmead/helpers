<?php

/**
 * File system controller
 * Mainly for use with WordPress
 * This collection since 18.10.2018
 */

namespace Mhm\Theme\Controller;

class FileSystemController {

  private static function downloadFile($filepath, $filename)
    {
      header('Content-Type: '.mime_content_type($filepath));
      header('Pragma: public');
      header('Expires: -1');
      header('Cache-Control: public, must-revalidate, post-check=0, pre-check=0');
      header('Content-Disposition: attachment; filename="'.$filename.'"');
      readfile($filepath);
      exit;
    }
  }

	private static function ensureFolderExists()
	{
		self::$folders = wp_upload_dir();
		if (!is_dir(self::$folders['path'])) {
			mkdir(self::$folders['path'], 0755, true);
		}
	}

}
