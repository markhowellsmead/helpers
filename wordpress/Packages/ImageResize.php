<?php

namespace SayHello\Theme\Package;

/**
 * On-the-fly image resizer.
 * Usage:

 $image_id = get_post_thumbnail_id();
 if($image_id){
     $image_resizer = new ImageResize();
     $image_url = $image_resizer->resize($image_id, ['width' => 600, 'height' => 600]);
 }

 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 * @since 8.5.2023
 */
class ImageResize
{

	public function resize(int $media_id, array $size)
	{
		if (!$media_id || empty($size['width'] ?? '') || empty($size['height'] ?? '')) {
			return '';
		}

		$image_path = get_attached_file($media_id);
		$new_size_name = 'resized_' . $size['width'] . 'x' . $size['height'];
		$image_name = basename($image_path);
		$image_suffix = strrchr($image_name, '.');
		$resized_image_name = str_replace($image_suffix, '-' . $new_size_name . $image_suffix, $image_name);
		$resized_image_path = str_replace($image_name, $resized_image_name, $image_path);
		$resized_image_url = str_replace($image_name, $resized_image_name, wp_get_attachment_url($media_id));

		// If the image already exists on the server and WP_DEBUG is off, don't regenerate the image
		if (file_exists($resized_image_path) && (!defined('WP_DEBUG') || !WP_DEBUG)) {
			return $resized_image_url;
		}

		$image_editor = wp_get_image_editor($image_path);

		if (!is_wp_error($image_editor)) {
			$image_editor->resize($size['width'], $size['height'], true);
			$image_editor->save($resized_image_path);
			return $resized_image_url;
		} else {
			return false;
		}
	}
}
