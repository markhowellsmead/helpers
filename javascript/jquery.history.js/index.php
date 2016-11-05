<?php

	$extraclass = isset($_GET['colour']) ? ' '.trim($_GET['colour']) : '';

?><!DOCTYPE html>
<!--[if IE 7 ]><html lang="de" class="de winie ie7 oldie"><![endif]-->
<!--[if IE 8 ]><html lang="de" class="de winie ie8 oldie"><![endif]-->
<!--[if IE 9 ]><html lang="de" class="de winie ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html><!--<![endif]-->
<head>
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title></title>
	<script src="//code.jquery.com/jquery-latest.js"></script>
	<script src="jquery.history.min.js"></script>
	
	<style>
		.box {
			background:grey;
			height:10em;
			margin:0 0 1em;
		}
		
		.box.red {
			background:#600;
		}

		.box.green {
			background:#060;
		}

		.box.blue {
			background:#006;
		}
		
		#ticker {
			padding:1em;color:#fff;background:#222;font-family:monospace;
		}
	</style>

</head>
<body>
<h1>Example of history state manipulation using <a href="https://github.com/browserstate/history.js">history.js</a></h1>
<p>Code base version history.js: v1.8b2, June 22 2013</p>
<p>Clicking on a button will change the colour of the box using dynamic CSS class name assignment and then change the URL in the browser without re-loading the page.</p>
<p>Subsequent use of the regular back/forward buttons in the browser will then allow you to cycle back through the options you've clicked on, as if each one is a separate page request.</p>
<p>Back/forward does not reload the page but brings back the previous "view". Therefore, the clock will run without interruption.</p>
<p>This "view" was originally loaded at <?=date('H:i:s');?>.</p>
<p><button data-colour="red" class="switch" href="?colour=red">Red</button> <button data-colour="blue" class="switch" href="?colour=blue">Blue</button></p>
<div class="box<?=$extraclass?>"></div>
<div id="ticker"></div>
<script>
	
	function updateBox(colour){
		$('.box').fadeOut('fast',function(){
			$(this).attr('class','box '+colour).fadeIn();
			return this;
		});
	}
	
	function getUrlParameter(sParam){
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	} 


	(function($s){
	
		$('button.switch').click(function(e){
			e.preventDefault();
			colour = $(this).data('colour');
			updateBox(colour);
			History.pushState({color:colour},null,$(this).attr('href'));
		});
		
		$(window).bind('popstate', function(event) {
			updateBox(getUrlParameter('colour'));
			console.log("location: " + document.location + ", state: " + event);
		});
		
		setInterval(function(){
			document.getElementById('ticker').innerHTML = new Date();
		},1000);
	
	
	})(jQuery);
	
	
</script>
</body>
</html>