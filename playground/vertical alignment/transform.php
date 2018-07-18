<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="robots" content="noindex, follow">
	<title>Vertical alignment</title>
	<style>
	
		html,body {
			margin:0;
			padding:0;
			height:100%;
		}
	
		.valign {
			background:grey;
			height:100%;
			padding:3em;
		}
		.inner {
			position: relative;
			top: 50%;
		  	-webkit-transform: translateY(-50%);
		  	-ms-transform: translateY(-50%);
		  	transform: translateY(-50%);
			background:silver;
			padding:1em;
		}
	</style>
</head>
<body>

<div class="valign">
	<div class="inner">
		<h1>Pure CSS vertical alignment</h1>
		<p>This content element remains fixed in the centre of the screen: vertically and horizontally.</p>
		<p>This is achieved using the CSS <code>translateY</code> property.</p>
		<p>Browser support: IE9+</p>
		<p><a href="http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/">via</a></p>
	</div>
</div>

</body>
</html>