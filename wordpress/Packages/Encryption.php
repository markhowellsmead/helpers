<?php

/**
 * Tool for encrypting and decrypting values.
 * In the scope of plugin password management, this is how we 
 * ensure the security and safety of the password stored in the database.
 *
 * Note that changing the values of SAYHELLO_API_ENCRYPTION_KEY
 * and/or SAYHELLO_API_ENCRYPTION_SALT (defined in wp-config.php)
 * will invalidate the value in the database. This means that
 * you'll have to enter and re-save the password using the plugin
 * settings screen.
 *
 * mark@sayhello.ch 3.3.2023
 * Basis https://felix-arntz.me/blog/storing-confidential-data-in-wordpress/
 */

namespace SayHello\ShpNexusVacancies\Package;


class Encryption
{

	private $key;
	private $salt;

	public function __construct()
	{
		$this->key  = $this->getDefaultKey();
		$this->salt = $this->getDefaultSalt();
	}

	/**
	 * Gets the default encryption key, which should ideally be added to wp-config.php.
	 *
	 * @return string
	 */
	private function getDefaultKey()
	{
		if (defined('SAYHELLO_API_ENCRYPTION_KEY') && '' !== SAYHELLO_API_ENCRYPTION_KEY) {
			return SAYHELLO_API_ENCRYPTION_KEY;
		}

		if (defined('LOGGED_IN_KEY') && '' !== LOGGED_IN_KEY) {
			return LOGGED_IN_KEY;
		}

		return 'this-is-not-a-secure-key';
	}

	/**
	 * Gets the salt, which should ideally be added to wp-config.php.
	 *
	 * @return string
	 */
	private function getDefaultSalt()
	{
		if (defined('SAYHELLO_API_ENCRYPTION_SALT') && '' !== SAYHELLO_API_ENCRYPTION_SALT) {
			return SAYHELLO_API_ENCRYPTION_SALT;
		}

		if (defined('LOGGED_IN_SALT') && '' !== LOGGED_IN_SALT) {
			return LOGGED_IN_SALT;
		}

		return 'this-is-not-a-secure-salt';
	}

	/**
	 * Encrypt the value using the salt
	 *
	 * @param string $raw_value
	 * @return string
	 */
	public function encrypt($value)
	{
		if (!extension_loaded('openssl')) {
			return $value;
		}

		$method = 'aes-256-ctr';
		$ivlen  = openssl_cipher_iv_length($method);
		$iv     = openssl_random_pseudo_bytes($ivlen);

		$raw_value = openssl_encrypt($value . $this->salt, $method, $this->key, 0, $iv);

		if (!$raw_value) {
			return false;
		}

		return base64_encode($iv . $raw_value);
	}

	/**
	 * Decrypt the value from the database and remove the salt value
	 *
	 * @param string $raw_value
	 * @return string
	 */
	public function decrypt($raw_value)
	{
		if (!extension_loaded('openssl')) {
			return $raw_value;
		}

		$raw_value = base64_decode($raw_value, true);

		$method = 'aes-256-ctr';
		$ivlen  = openssl_cipher_iv_length($method);
		$iv     = substr($raw_value, 0, $ivlen);

		$raw_value = substr($raw_value, $ivlen);

		$value = openssl_decrypt($raw_value, $method, $this->key, 0, $iv);
		if (!$value || substr($value, -strlen($this->salt)) !== $this->salt) {
			return false;
		}

		return substr($value, 0, -strlen($this->salt));
	}
}
