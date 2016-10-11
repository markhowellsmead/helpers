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
    <title>Equal height columns</title>
    
    <style>
	    
	    ul.key, ul.key li {
		    margin:0;padding:0;
	    }

	    ul.key {
	    	text-align:center;
		    list-style-type: none;
		    max-width:500px;
			display:table;
	    }
	    
		ul.key li {
			background: silver;
			width:33.33%;
			border:1px solid white;
			vertical-align: middle;
			display:table-cell;
		}
		
		ul.key p {
			margin:0;padding:.25em;
		}
		ul.key small {
			display:block;
		}
	    
    </style>


</head>
<body>
	<ul class="calendar key row3">
		<li><p>cell 1<small>(the first cell)</small></p></li>
		<li>
			<p>cell 2 with some text which is a bit longer, to ensure that it is higher than the other cells</p>
			<p>cell 2 with some text which is a bit longer, to ensure that it is higher than the other cells</p>
		</li>
		<li><p>cell 3</p></li>
	</ul>
</body>
</html>