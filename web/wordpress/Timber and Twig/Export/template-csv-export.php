<?php
/**
 * Template Name: CSV Export Template
 */

header('Content-type: text/csv');
header('Content-Disposition: attachment; filename=data.' .date('Y-m-d-H-i-s'). '.csv');
header('Pragma: no-cache');
header('Expires: 0');

+use Timber\Timber;

$context['posts'] = Timber::get_posts(['post_type' => 'my_post_type', 'numberposts' => -1]);
Timber::render('csv-export.twig', $context);
