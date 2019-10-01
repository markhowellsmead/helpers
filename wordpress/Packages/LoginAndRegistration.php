<?php

namespace MarkHowellsMead\Theme\Packages;

/**
 * Funky stuff for login and registration process
 * Relies on the ThemeOptions Package and the Members plugin.
 *
 * @author Mark Howells-Mead <mark@permanenttourist.ch>
 * @version 1.0
 */
class LoginAndRegistration
{
	public function run()
	{
		add_action('gform_activate_user', [$this, 'afterUserActivate'], 10, 3);
		add_filter('login_redirect', [$this, 'redirectOnLogin'], 10, 1);
		add_filter('logout_redirect', [$this, 'redirectOnLogout'], 10, 1);
		add_filter('init', [$this, 'maybeDisallowAdmin'], 10);
		add_filter('login_url', [$this, 'customLoginURL'], 10, 1);
		add_action('wp_login_failed', [$this, 'loginFail'], 10);

		add_filter('login_form_top', [$this, 'checkForFail'], 10, 1);
		add_filter('login_form_top', [$this, 'checkForRegistered'], 10, 1);
		add_filter('login_form_top', [$this, 'checkForPasswordRequested'], 10, 1);
	}

	public function checkForFail($html)
	{
		if (isset($_GET['login']) && $_GET['login'] == 'failed') {
			$html .= '<p class="alert callout login-error-message">'._x('Anmeldung fehlgeschlagen.', 'Login error message in custom login process', 'wptheme-flightregister').'</p>';
		}
		if (isset($_GET['activated']) && $_GET['activated'] == 'yes') {
			$html .= '<p class="primary callout login-success-message">'._x('Ihr Konto ist nun aktiviert. Bitte melden Sie sich an.', 'Login error message in custom login process', 'wptheme-flightregister').'</p>';
		}
		return $html;
	}

	public function checkForRegistered($html)
	{
		if (isset($_GET['registered']) && $_GET['registered'] == 'yes') {
			$html .= '<p class="primary callout registered-success-message">'._x('Registrierung erfolgreich. Sie erhalten in Kürze eine E-Mail von uns, mit der Sie Ihr Konto bestätigen können.', 'Registration success message in custom process', 'wptheme-flightregister').'</p>';
		}
		return $html;
	}

	public function checkForPasswordRequested($html)
	{
		if (isset($_GET['newpassword']) && $_GET['newpassword'] == 'requested') {
			$html .= '<p class="primary callout password-requested-message">'._x('Falls ein Konto mit der angegebener E-Mail-Adresse oder mit dem angegebenen Benutzernamen vorhanden ist, erhalten Sie gleich eine E-Mail mit einer Information, wie Sie Ihr Passwort zurücksetzen können.', 'Registration success message in custom process', 'wptheme-flightregister').'</p>';
		}
		return $html;
	}

	public function loginFail()
	{
		$login_page = ThemeOptions::getOption('login_page');
		if ($login_page && isset($login_page->ID)) {
			$login_url = get_permalink($login_page->ID);
			$login_url = add_query_arg('login', 'failed', $login_url);
			wp_redirect($login_url);
			exit;
		}
	}

	public function customLoginUrl($url, $redirect)
	{
		$special_pages = get_field('special_pages', 'options');
		if (isset($special_pages['profile']) && $special_pages['profile'] instanceof WP_Post) {
			$url = get_permalink($special_pages['profile']->ID);
			if (strpos($redirect, get_admin_url()) === false && !empty($redirect)) {
				$url = add_query_arg('redirect_to', $redirect, $url);
			}
		}

		return $url;
	}

	public static function loginForm()
	{
		$login_form = wp_login_form([ 'echo' => false ]);

		$dom = new \DOMDocument();
		$dom->loadHTML(mb_convert_encoding($login_form, 'HTML-ENTITIES', 'UTF-8'));
		$xpath = new \DOMXpath($dom);
		$remember = $xpath->query('//p[@class="login-remember"]');
		foreach ($remember as $container) {
			$old_label = $container->childNodes->item(0);
			$checkbox = $old_label->childNodes->item(0);

			$new_label = $dom->createElement('label');
			$new_label->textContent = $old_label->textContent;
			$new_label_for = $dom->createAttribute('for');
			$new_label_for->value = 'rememberme';
			$new_label->appendChild($new_label_for);

			$container->removeChild($old_label);
			$container->appendChild($checkbox);
			$container->appendChild($new_label);
		}

		// Save the updated HTML to $login_form and output it.
		$login_form = $dom->saveHTML();
		return $login_form;
	}

	public static function checkAccess()
	{
		if (function_exists('members_can_current_user_view_post')) {
			if (!members_can_current_user_view_post()) {
				if (is_user_logged_in()) {
					self::redirectUser();
				} else {
					wp_redirect(wp_login_url(get_permalink()));
					exit;
				}
				exit;
			}
		}
	}

	public static function redirectNonUser()
	{
		if (!is_user_logged_in()) {
			$login_page = ThemeOptions::getOption('login_page');
			$redirect_url = $login_page && isset($login_page->ID) ? get_permalink($login_page->ID) : get_home_url();
			if (!empty($redirect_url)) {
				wp_redirect($redirect_url);
				exit;
			}
		}
	}

	public static function redirectUser()
	{
		if (is_user_logged_in()) {
			$profile_page = ThemeOptions::getOption('profile_page');
			$redirect_url = $profile_page && isset($profile_page->ID) ? get_permalink($profile_page->ID) : get_home_url();
			if (!empty($redirect_url)) {
				wp_redirect($redirect_url);
				exit;
			}
		}
	}

	public function afterUserActivate($user_id, $user_data, $signup_meta)
	{
		//add note to entry
		\GFFormsModel::add_note($signup_meta['lead_id'], $user_id, 'admin', 'Benutzer ' . $user_data['display_name'] . ' bestätigte das Konto.');
		$login_page = ThemeOptions::getOption('login_page');
		$redirect_url = $login_page && isset($login_page->ID) ? get_permalink($login_page->ID) : get_home_url();
		$redirect_url = add_query_arg('activated', 'yes', $redirect_url);
		if (!empty($redirect_url)) {
			wp_redirect($redirect_url);
			exit();
		}
	}

	public function redirectOnLogin($redirect_url)
	{
		if (!current_user_can('edit_posts')) {
			$profile_page = ThemeOptions::getOption('profile_page');
			$redirect_url = $profile_page && isset($profile_page->ID) ? get_permalink($profile_page->ID) : null;
			if (!empty($redirect_url)) {
				wp_redirect($redirect_url);
				exit;
			}
		}
		
		return $redirect_url;
	}

	public function redirectOnLogout($redirect_url)
	{
		if (!current_user_can('edit_posts')) {
			$login_page = ThemeOptions::getOption('login_page');
			$redirect_url = $login_page && isset($login_page->ID) ? get_permalink($login_page->ID) : get_home_url();
		}
		return $redirect_url;
	}

	public function maybeDisallowAdmin()
	{
		if (is_user_logged_in() && is_admin() && !current_user_can('edit_posts') && !(defined('DOING_AJAX') && !DOING_AJAX)) {
			$profile_page = ThemeOptions::getOption('profile_page');
			$redirect_url = $profile_page && isset($profile_page->ID) ? get_permalink($profile_page->ID) : get_home_url();
			if (!empty($redirect_url)) {
				wp_redirect($redirect_url);
				exit;
			}
		}
	}
}
