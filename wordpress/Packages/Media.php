<?php

namespace SayHello\Theme\Package;

use SayHello\Theme\Package\Helpers;

/**
 * Media stuff - images and videos
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Media
{

    public function run()
    {
        add_action('after_setup_theme', [$this, 'imageSizes'], 11);
        add_filter('oembed_result', [$this, 'cleanEmbedParameters'], 10, 2);
        add_filter('oembed_result', [$this, 'wrapVideoHTML'], 20, 2);
    }

    /**
     * This function check if a given attachment ID is a svg or not
     *
     * @since 0.1.0
     *
     * @param $attachment_id
     *
     * @return bool
     */
    public static function isSVG($attachment_id)
    {
        if ('attachment' !== get_post_type($attachment_id)) {
            return false;
        }

        return 'image/svg+xml' === get_post_mime_type($attachment_id);
    }

    public function imageSizes()
    {
        // Woocommerce images are managed via the Customizer
        add_image_size('medium', 570, 9999, false);
        add_image_size('modelgallery', 800, 800, true);
    }

    public function cleanEmbedParameters($html, $url)
    {
        $host = parse_url($url, PHP_URL_HOST);
        switch ($host) {
        case 'youtube.com':
        case 'www.youtube.com':
        case 'youtu.be':
            $html = str_replace('?feature=oembed', '?feature=oembed&hl=en&amp;fs=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;hd=1&amp;vq=hd720&amp;version=3&amp;autohide=1&amp;wmode=opaque&amp;cc=1', $html);
            $html = preg_replace('~https?://(www\.)?youtube\.com/embed/~', 'https://www.youtube-nocookie.com/embed/', $html);
            $html = preg_replace('~ src=~', ' data-src=', $html);
            break;
        }

        return $html;
    }

    public function wrapVideoHTML($html, $url = '')
    {
        preg_match('~[www\.]?(vimeo\.|wordpress\.tv|youtube|youtu\.be)~', $url, $matches);

        if (!is_admin() && !is_feed() && (!empty($matches))) {
            $html = sprintf(
                '<div data-sh-lazyvideo class="responsive-iframe responsive-iframe--ratio-16x9 c-oembed c-oembed--%1$s" %2$s>%3$s</div>',
                sanitize_title_with_dashes($matches[0]),
                sprintf(
                    'style="background-image:url(\'%s\')"',
                    self::oembedThumbnailSrc($url)
                ),
                $html
            );
        }

        return $html;
    }

    /**
     * Get remote video thumbnail URL
     *
     * @param  string $source_url The video URL
     * @return string The Video Thumbnail URL
     **/
    public static function oembedThumbnailSrc($source_url)
    {
        if ($source_url == '') {
            return '';
        }

        // angabe ohne url gibt leeres string zurück
        $atts = array('url' => $source_url);

        $aPath = parse_url($atts['url']);
        $aPath['host'] = str_replace('www.', '', $aPath['host']);

        switch ($aPath['host']) {
        case 'youtu.be':
            $atts['id'] = preg_replace('~^/~', '', $aPath['path']);
            return 'https://img.youtube.com/vi/'.$atts['id'].'/hqdefault.jpg';
         break;

        case 'youtube.com':
            $aParams = explode('&', $aPath['query']);
            foreach ($aParams as $param) :
                 // nach parameter 'v' suchen
                 $thisPair = explode('=', $param);
                if (strtolower($thisPair[0]) == 'v') :
                    $atts['id'] = $thisPair[1];
                    break;
                endif;
            endforeach;
            if (!$atts['id']) {
                 return '';    // wenn ID nicht verfügbar, gibt leeres string zurück
            } else {
                 return 'https://img.youtube.com/vi/'.$atts['id'].'/hqdefault.jpg'; // gibt 1. thumbnail-bild-src zurück.
            }
            break;

        case 'vimeo.com':
            $urlParts = explode('/', $atts['url']);
            $hash = @unserialize(@file_get_contents('https://vimeo.com/api/v2/video/'.$urlParts[3].'.php'));
            if ($hash && $hash[0] && (isset($hash[0]['thumbnail_large']) && $hash[0]['thumbnail_large'] !== '')) {
                 return $hash[0]['thumbnail_large'];
            } else {
                 return '';
            }
            break;

        default:
            // gibt leeres string zurück
            return '';
         break;
        }
    }
}
