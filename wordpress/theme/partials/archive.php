<?php get_header(); ?>

<section class="c-archive">

	<?php get_template_part('partials/block-area/archive-top', 'post'); ?>

	<header class="c-archive__header">
		<?php
		the_archive_title('<h1 class="c-archive__title">', '</h1>');
		if (!empty($term_description = term_description())) {
			printf(
				'<div class="c-archive__description">%s</div>',
				apply_filters('the_content', $term_description)
			);
		}

		if (is_search()) {
			get_search_form();
		}
		?>
	</header>

	<div class="c-archive__content">
		<?php
		if (have_posts()) {
			while (have_posts()) {
				the_post();
				get_template_part('partials/excerpt', get_post_type());
			}
		}
		?>
	</div>

	<?php
	$paginate = paginate_links([
		'mid_size' => 8
	]);
	if ('' !== $paginate) {
		echo '<div class="c-pagination">';
		echo '<div class="c-pagination__content">' .$paginate. '</div>';
		echo '</div>';
	}
	?>

	<?php get_template_part('partials/block-area/archive-bottom', 'post'); ?>

</section>

<?php get_footer();
