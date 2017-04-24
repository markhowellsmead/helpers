<?php
//	CODEX-Referenz: http://codex.wordpress.org/Function_Reference/register_sidebar
//	Stand 12.10.2012 mhm


// in functions.php, damit die Seitenbalken in BE sowohl FE definiert ist
	if(function_exists('register_sidebar')){
		register_sidebar(array(
		
			// Einmaliger Name für den Seitenbalken
			'name'=>'Startseite',	

			// Jedes Widget in der Seitenbalken wird mit diesen Tags umgefasst
			'before_widget' => '<div class="teaser">',
			'after_widget' => '</div>',
			
			// Der Titel jeden Widget wird mit diesen Tags umgefasst
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
	}



// In die Ausgabedatei für FE, z.B. sidebar.php, einfügen.
	dynamic_sidebar('Startseite');