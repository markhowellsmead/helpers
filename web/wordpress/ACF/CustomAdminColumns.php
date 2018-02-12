<?php

/**
 * Customization and settings for the Advanced Custom Fields plugin
 *
 * @author Mark Howells-Mead <permanent.tourist@gmail.com>
 * @version 1.0
 */
class CustomAdminColumns
{
	public function __construct()
	{
		add_action('manage_edit-acf-field-group_columns', [$this, 'addCustomColumns'], 15, 1);
		add_action('manage_acf-field-group_posts_custom_column', [$this, 'addFieldGroupDate'], 15, 2);
	}

	public static function array_insert_after(array $array, $key, array $new)
	{
		$keys = array_keys($array);
		$index = array_search($key, $keys);
		$pos = false === $index ? count($array) : $index + 1;
		return array_merge(array_slice($array, 0, $pos), $new, array_slice($array, $pos));
	}

	public function addCustomColumns($columns)
	{
		$columns = self::array_insert_after($columns, 'acf-fg-description', array(
			'acf-fg-create-date' => _x('Created date', 'ACF field group admin column label', 'text-domain')
		));
		return $columns;
	}

	public function addFieldGroupDate($column_name, $post_id)
	{
		if ($column_name == 'acf-fg-create-date') {
			echo '<time style="display: block">' .date('d.M.Y H:i', strtotime(get_post($post_id)->post_date)). '</time>';
		}
	}
}
