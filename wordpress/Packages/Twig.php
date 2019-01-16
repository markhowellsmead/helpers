<?php

namespace MHM\Theme\Package;

/**
 * Funky Twig stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Twig
{
	public function run()
	{
		add_action('timber/twig/filters', [$this, 'addFilters'], 10, 1);
	}

	/**
	 * Add functions to Twig
	 * @param Twig_Environment $twig The Twig environment object
	 */
	public function addFilters($twig)
	{
		$twig->addFilter(new \Twig_SimpleFilter('link_image', function (string $html, array $link) {
			if (empty($link) || !isset($link['url']) || empty($link['url'])) {
				return $html;
			}
			
			return sprintf(
				'<a href="%1$s"%2$s%3$s>%4$s</a>',
				$link['url'],
				isset($link['target']) && !empty($link['target']) ? sprintf(' target="%s"', $link['target']) : '',
				isset($link['css_class']) && !empty($link['css_class']) ? sprintf(' class="%s"', $link['css_class']) : '',
				$html
			);
		}));

		return $twig;
	}
}
