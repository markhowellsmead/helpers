<?php

namespace SayHello\Theme\Package;

use Timber\Timber;

/**
 * Sidebar stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Sidebars
{

	private $sidebars;
	private $selectable_sidebars;

	public function __construct()
	{
		// Fixed sidebars, hard-coded into the specific layout locations
		$this->sidebars = [
			[
				'name' => __('Inhaltsseiten - rechts', 'sht'),
				'id' => 'page_right',
				'description' => __('Widgets in diesem Bereich erscheinen in der rechten Seitenspalte jeder normalen Inhaltsseite.', 'sht'),
				'before_widget' => '<div class="c-widget %2$s">',
				'after_widget' => '</div>',
				'before_title' => '<p class="c-widget__title">',
				'after_title' => '</p>',
			],
			[
				'name' => __('Produktseite - links', 'sht'),
				'id' => 'product_left',
				'description' => __('Widgets in diesem Bereich erscheinen nach dem Produktbild auf der Detailansicht für jeden Produkt.', 'sht'),
				'before_widget' => '<div class="c-widget %2$s">',
				'after_widget' => '</div>',
				'before_title' => '<p class="c-widget__title">',
				'after_title' => '</p>',
			]
		];

		// Selectable sidebars, which can be selected by the editor if specific page templates are in use
		$this->selectable_sidebars = [
			[
				'name' => __('Auswählbarer Seitenleiste 1', 'sht'),
				'id' => 'general_1',
				'description' => __('Widgets in diesem Bereich erscheinen auf den Seiten, auf denen diesen Seitenleiste redaktionell ausgewählt ist.', 'sht'),
				'before_widget' => '<div class="c-widget %2$s">',
				'after_widget' => '</div>',
				'before_title' => '<p class="c-widget__title">',
				'after_title' => '</p>',
			],
			[
				'name' => __('Auswählbarer Seitenleiste 2', 'sht'),
				'id' => 'general_2',
				'description' => __('Widgets in diesem Bereich erscheinen auf den Seiten, auf denen diesen Seitenleiste redaktionell ausgewählt ist.', 'sht'),
				'before_widget' => '<div class="c-widget %2$s">',
				'after_widget' => '</div>',
				'before_title' => '<p class="c-widget__title">',
				'after_title' => '</p>',
			],
			[
				'name' => __('Auswählbarer Seitenleiste 3', 'sht'),
				'id' => 'general_3',
				'description' => __('Widgets in diesem Bereich erscheinen auf den Seiten, auf denen diesen Seitenleiste redaktionell ausgewählt ist.', 'sht'),
				'before_widget' => '<div class="c-widget %2$s">',
				'after_widget' => '</div>',
				'before_title' => '<p class="c-widget__title">',
				'after_title' => '</p>',
			],
		];
	}

	/**
	 * Add hooks for this Package type
	 * @return void
	 */
	public function run()
	{
		if (count($this->sidebars)) {
			$this->registerACFSelect();
			add_action('after_setup_theme', [$this, 'themeSupport']);
			add_action('widgets_init', [$this, 'register']);
			add_filter('timber_context', [$this, 'extendTimberContext']);
		}
	}

	/**
	 * Add Theme support for Widget Sidebar areas
	 * @return void
	 */
	public function themeSupport()
	{
		add_theme_support('sidebars');
	}

	/**
	 * Adds all sidebars to the global Timber context.
	 *
	 * @see Timber\Timber
	 * @param array $context existing Timber context
	 */
	public function extendTimberContext($context)
	{
		if (!empty($this->sidebars)) {
			if (!isset($context['sidebars'])) {
				$context['sidebars'] = [];
			}
			foreach (array_values($this->sidebars) as $data) {
				$context['sidebars'][$data['id']] = Timber::get_widgets($data['id']);
			}
		}

		// Extend the context with the currently selected sidebar, if one has been chosen
		$post_id = get_the_ID();
		if ((int)$post_id && !empty(get_field('sht-sidebar-selector-entry', $post_id))) {
			$context['selected_sidebar'] = Timber::get_widgets(get_field('sht-sidebar-selector-entry', $post_id));
		}

		return $context;
	}

	/**
	 * Register the sidebars detailed in the two sidebars arrays
	 * @return void
	 */
	public function register()
	{
		foreach (array_merge($this->sidebars, $this->selectable_sidebars) as $sidebar) {
			register_sidebar($sidebar);
		}
	}

	/**
	 * Add a new ACF field group and field to select a Widget Sidebar for the current page
	 * @return void
	 */
	public function registerACFSelect()
	{
		if (function_exists('acf_add_local_field_group') && function_exists('acf_add_local_field')) {
			$prefix = sht_theme()->prefix;

			acf_add_local_field_group([
				'key' => $prefix.'-sidebar-selector',
				'title' => __('Seitenleiste', 'sht'),
				'menu_order' => 50,
				'fields' => [],
				'position' => 'side',
				'location' => [[
					[
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'page',
					],
					[
						"param" => "page_template",
						"operator" => "!=",
						"value" => "template-wide.php"
					],
					[
						"param" => "page_template",
						"operator" => "!=",
						"value" => "template-manual.php"
					],
					[
						"param" => "page_template",
						"operator" => "!=",
						"value" => "template-gallery.php"
					],
					[
						"param" => "page_template",
						"operator" => "!=",
						"value" => "template-builder.php"
					]
				]
				]
			]);

			$choices = [
				'' => _x('Keine Seitenleiste', 'sht')
			];

			foreach ($this->selectable_sidebars as $sidebar) {
				$choices[$sidebar['id']] = $sidebar['name'];
			}

			acf_add_local_field([
				'key' => 'field_'.$prefix.'-sidebar-selector-entry',
				'label' => __('Seitenleiste auswählen', 'sht'),
				'description' => __('Wählen Sie eine Seitenleiste aus, die Sie unter Design » Widgets befüllt haben.', 'sht'),
				'name' => $prefix.'-sidebar-selector-entry',
				'type' => 'select',
				'parent' => $prefix.'-sidebar-selector',
				'choices' => $choices
			]);
		}
	}
}
