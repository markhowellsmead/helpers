<?php

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
}
