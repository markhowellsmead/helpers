<!DOCTYPE html>
<!--[if IE 7 ]><html lang="de" class="de winie ie7 oldie"><![endif]-->
<!--[if IE 8 ]><html lang="de" class="de winie ie8 oldie"><![endif]-->
<!--[if IE 9 ]><html lang="de" class="de winie ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="de" class="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"><!--<![endif]-->
<head>
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title>Content slider with left-aligned tabs for navigation</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="responsiveslides.min.js"></script>
    <link rel="stylesheet" href="contentslider.css"/>
    <style>
    	html,body {
	    	margin:0;padding:0;
    	}
    	body {
	    	font-size: 1.25em;
    	}
    	.module.contentslider {
	    	width:930px;
    	}
	    
    </style>
</head>
<body>


<div class="module contentslider">
	<ul class="slidepager has4">
		<li><a href="#">Label for slide 1 with length for line break</a></li>
		<li><a href="#">Label for slide 2</a></li>
		<li><a href="#">Label for slide 3 with text</a></li>
		<li><a href="#">Label for slide 4 with too much length for lin…</a></li>
	</ul>
	<ul class="slides">
		<li>
			<div class="body">
				<h3>Slide 1</h3>
				<p>für Turboliberalisierer</p>
				<a href="#" class="button">Weiterlesen</a>
			</div>
			<img src="contentslider1.jpg" alt="Foto"/>
		</li>
		<li>
			<div class="body">
				<h3>Slide 2</h3>
				<p>für Turboliberalisierer</p>
				<a href="#" class="button">Weiterlesen</a>
			</div>
			<img src="contentslider2.jpg" alt="Foto"/>
		</li>
		<li>
			<div class="body">
				<h3>Slide 3</h3>
				<p>für Turboliberalisierer</p>
				<a href="#" class="button">Weiterlesen</a>
			</div>
			<img src="contentslider3.jpg" alt="Foto"/>
		</li>
		<li>
			<div class="body">
				<h3>Slide 4</h3>
				<p>für Turboliberalisierer</p>
				<a href="#" class="button">Weiterlesen</a>
			</div>
			<img src="contentslider4.jpg" alt="Foto"/>
		</li>
	</ul>
</div>

<script>
	$(function () {
		$('.slides').responsiveSlides({
			manualControls: '.slidepager'
		});
	});
</script>

</body>
</html>