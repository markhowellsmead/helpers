<?php

/**
	 * Sort array by two or more properties
	 * https://stackoverflow.com/a/72129058/1750646
   *
   * e.g. $posts = multiSortPostArray($posts, ['post_author' => SORT_ASC, 'post_date' => SORT_DESC]);
	 *
	 * @param array $posts
	 * @param array $sort_array
	 * @return array
	 */
	public function multiSortPostArray(array $posts, array $sort_array)
	{

		$arrays = [];

		foreach ($sort_array as $key => $sort) {
			$column = array_column($posts, $key);
			if (!empty($column)) {
				$arrays[] = $column;
				$arrays[] = $sort;
			}
		}

		if (!empty($arrays)) {
			$arrays[] = $posts;
			if (!array_multisort(...$arrays)) {
				var_dump('some error');
				die();
			}
			$posts = ($arrays[array_key_last($arrays)]);
		}

		return $posts;
	}
