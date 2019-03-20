<?php

namespace SayHello\Theme\Package;

/**
* Configuration etc. for ACF
*
* @author Mark Howells-Mead <mark@sayhello.ch>
*/
class ACF
{

	public function run()
	{
		add_action('acf/init', [ $this, 'registerFieldGroups' ]);
	}

	public function registerFieldGroups()
	{
		if (function_exists('acf_add_local_field_group')) :
			acf_add_local_field_group(
				[
					'key'=> 'group_pagebuilder',
					'title' => __('Seitenbaukasten', 'sha'),
					'fields'=> [
						[
							'key' => 'field_pagebuilder',
							'label' => __('Inhaltskomponenten', 'sha'),
							'name' => 'pagebuilder',
							'type' => 'flexible_content',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper'  => [
								'width' => '',
								'class' => '',
								'id'=> '',
							],
							'layouts'  => [
								'layout_pagebuilder_wysiwyg' => [
									'key'=> 'layout_pagebuilder_wysiwyg',
									'name'  => 'wysiwyg',
									'label' => _x('WYSIWYG', 'ACF layout label', 'sha'),
									'display'=> 'block',
									'sub_fields' => [
										[
											'key' => 'field_title',
											'label'=> _x('Überschrift', 'ACF field label', 'sha'),
											'name' => 'title',
											'type' => 'text',
											'instructions' => '',
											'required' => 0,
											'conditional_logic' => 0,
											'wrapper' => [
												'width' => '',
												'class' => '',
												'id'=> '',
											],
											'default_value' => '',
											'placeholder' => '',
											'prepend' => '',
											'append'  => '',
											'maxlength'=> '',
										],
										[
											'key' => 'field_content',
											'label'=> _x('Inhalt', 'ACF field label', 'sha'),
											'name' => 'content',
											'type' => 'wysiwyg',
											'instructions' => '',
											'required' => 0,
											'conditional_logic' => 0,
											'wrapper' => [
												'width' => '',
												'class' => '',
												'id'=> '',
											],
											'default_value' => '',
											'tabs' => 'all',
											'toolbar' => 'full',
											'media_upload' => 1,
											'delay'=> 0,
										],
									],
									'min'=> '',
									'max'=> '',
								],
							],
							'button_label' => _x('Inhaltselement hinzufügen', 'ACF button label', 'sha'),
							'min'  => '',
							'max'  => '',
						],
					],
					'location' => [
						[
							[
								'param'=> 'page_template',
								'operator' => '==',
								'value'=> 'template-pagebuilder.php',
							],
						],
					],
					'menu_order'=> 0,
					'position' => 'normal',
					'style' => 'default',
					'label_placement'  => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'=> [
						0 => 'the_content',
					],
					'active'=> true,
					'description'  => '',
				]
			);
		endif;
	}
}
