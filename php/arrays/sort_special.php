<?php

class SortSpecial {

	public function countries($countries)
	{
		usort($countries, function ($first, $second) {
			if ($first === $second) {
				return 0;
			} else {
				for ($i = 0; $i < min(strlen($first), strlen($second)); $i++) {
					$cmp = $this->compareChar(substr($first, $i, 1), substr($second, $i, 1));
					if ($cmp != 0) {
						return $cmp;
					}
				}
				return (strlen($first) > strlen($second)) ? 1 : 0;
			}
		});

		return $countries;
	}

	private function compareChar($first, $second)
	{
		$characters = 'AÀÁÄBCÇDEÈÉFGHIÌÍJKLMNOÒÓÖPQRSTUÙÚÜVWXYZ';
		$characters .=  'aàáäbcçdeèéfghiìíjklmnoòóöpqrstuùúüvwxyz';
		$pos_first = strpos($characters, $first);
		$pos_second = strpos($characters, $second);
		if ($pos_first === false) {
			if ($pos_second === false) {
				return 0;
			} else {
				return 1;
			}
		} elseif ($pos_second === false) {
			return -1;
		} else {
			return $pos_first - $pos_second;
		}
	}

}
