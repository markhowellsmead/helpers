<?php
include 'NamespacedFile.php';

// Provoke error
inline_message('Inline class call');

// Correct call
Helpers\Namespaced\inline_message('Inline class call');
