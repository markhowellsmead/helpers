<?php

//custom-login (e.g. sidebar)
//ava 7.2.13
?>
<form name="loginform" id="loginform" action="<?php bloginfo('url'); ?>/wp-login.php" method="post">
	<p><label for="log">Username</label> <input type="text" name="log" id="user_login" class="input" placeholder="Username" value="" size="20" tabindex="10"></p>
	<p><label for="pwd">Password</label> <input type="password" name="pwd" id="user_pass" class="input" placeholder="Password" value="" size="20" tabindex="20"></p>
	<input type="submit" name="wp-submit" id="wp-submit" value="LOG IN">
	<input type="hidden" name="redirect_to" value="<?php bloginfo('url'); ?>">
	<input type="hidden" name="testcookie" value="1">
</form>