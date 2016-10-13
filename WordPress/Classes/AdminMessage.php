<?php
/**
 * A messaging class for the WordPress Admin area.
 * This gets around issues with passing message texts into the admin_notices function and helps towards forward-compatbility.
 * PHP 5.3+ required due to the use of PHP namespaces.
 *
 * Usage:
 * require_once 'AdminMessage.php';
 * new \MHM\WordPressAdmin\AdminMessage('This is an error message!', 'notice notice-error');
 *
 * Via http://wordpress.stackexchange.com/a/224501/83412
 * Mark Howells-Mead | permanent.tourist@gmail.com | Since 13.10.2016 | Thanks http://wordpress.stackexchange.com/a/224501/83412
 */

namespace MHM\WordPress;

class AdminMessage
{
    private $_message;
    private $_type;

    public function __construct($message, $type = 'updated')
    {
        $this->_message = $message;
        $this->_type = $type;

        add_action('admin_notices', array($this, 'render'));
    }

    public function render()
    {
        printf('<div class="%1$s">%2$s</div>', $this->_type, $this->_message);
    }
}
