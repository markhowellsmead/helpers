<?php

class DateinamenBereinigen
{
    public function dump($var, $die = false)
    {
        echo '<pre>'.print_r($var, 1).'</pre>';
        if ($die) {
            die();
        }
    }
    private function normalizeString($str = '')
    {
        if ($str === '2_Begründung') {
            $this->dump(strpos($str, 'ü') ? 'yes' : 'no');
        }

        $str = strip_tags($str);
        $str = preg_replace('/[\r\n\t ]+/', ' ', $str);
        $str = preg_replace('/[\"\*\/\:\<\>\?\'\|]+/', ' ', $str);

        $d1 = array('ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü');
        $d2 = array('ae', 'oe', 'ue', 'ss', 'Ae', 'Oe', 'Ue');
        $str = str_replace($d1, $d2, $str);

        $str = html_entity_decode($str, ENT_QUOTES, 'utf-8');
        $str = htmlentities($str, ENT_QUOTES, 'utf-8');
        $str = preg_replace('/(&)([a-z])([a-z]+;)/i', '$2', $str);
        $str = str_replace(' ', '_', $str);
        $str = rawurlencode($str);
        $str = str_replace('%', '-', $str);

        return $str;
    }

    public function getFiles($dir, $options = [])
    {
        $result = array();

        $suffix = '';

        if (is_dir($dir)) {
            $cdir = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir), RecursiveIteratorIterator::CHILD_FIRST);
            foreach ($cdir as $file) {
                $oldname = $file->getFilename();
                if (!in_array($oldname, array('.', '..'))) {
                    if (is_dir($dir.DIRECTORY_SEPARATOR.$oldname)) {
                        $newname = $this->normalizeString($oldname);
                        if ($newname !== $oldname) {
                            //rename($dir.DIRECTORY_SEPARATOR.$oldname, $dir.DIRECTORY_SEPARATOR.$newname);
                        }

                        $result[$newname] = $this->getFiles($dir.DIRECTORY_SEPARATOR.$newname, $options);
                    } else {
                        $matches = false;
                        if (isset($options['exclude'])) {
                            foreach ($options['exclude'] as $pattern) {
                                if (preg_match('~'.$pattern.'~', $oldname)) {
                                    $matches = true;
                                }
                            }
                        }
                        if (!$matches) {
                            $newname = $this->normalizeString($oldname);
                            if ($newname !== $oldname) {
                                //rename($dir.DIRECTORY_SEPARATOR.$oldname, $dir.DIRECTORY_SEPARATOR.$newname);
                            }
                            $result[$newname] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $dir.DIRECTORY_SEPARATOR.$newname);
                        }
                    }
                }
            }
        }

        return $result;
    }//getFiles
}

$fn = new DateinamenBereinigen();
$files = $fn->getFiles(__DIR__.'/files', [
    'exclude' => ['.db', '.DS_Store'],
]);

//$fn->dump($files);
