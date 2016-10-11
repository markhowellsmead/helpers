<!DOCTYPE html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
    @keyframes spin {
      from {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin /* Safari and Chrome */ {
      from {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
      }
    }
    
    /******************************************************/
    
    * {font-weight:300;}
    body {
    	font-size:16px;
    	font-weight:bold;
    	font-family:helvetica,arial,sans-serif;;
    	background:#f5f5f5;
    	margin:0;
    	padding:.5em;
    	color:#666;
    	text-align:center;
    }
    code {font-family:monospace;font-size:small;color:#960}
    img {
    	max-width:150px;
    	height:auto;
    	border:0;
    	-webkit-transition: -webkit-transform 20s ease-in;
    	transition: -webkit-transform 20s ease-in;
    }
    a {
    	color:#cd1338;
    }
    
    a.spin{
    	-webkit-animation: spin 60s ease-in-out infinite;
    	-moz-animation: spin 60s ease-in-out infinite;
    	-ms-animation: spin 60s ease-in-out infinite;
    	-o-animation: spin 60s ease-in-out infinite;
    	animation: spin 60s ease-in-out infinite;
    }
    #main {
    	margin:auto;
    	padding:0 .5em;
    }
    @media screen and (min-width:640px) and (min-height:640px){
    	img {max-width:100%;}
    	html,body 	{width:100%;height:100%;overflow:hidden}
    	#main		{position:absolute;left:10%;right:10%;bottom:40%;}
    }
    </style>
</head>
<body>
<div class="scrollable">
    <div class="wrap">
		<div id="main">
			<a class="spin" href="http://www.frappant.ch"><img src="data:image/png;base64,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
" alt="frappant.ch"></a>
			<h1>Hier wird gearbeitet</h1>
			<p>Hier entsteht eine neue Website der <a href="http://www.frappant.ch">!frappant webfactory</a>.</p>
			<p>Schön, wenn Sie zu einem späteren Zeitpunkt nochmal vorbeischauen.</p>
			<p><code><?=$_SERVER['HTTP_HOST']?></code></p>
		</div>
    </div>
</div>
<script>
window.onload=function(){window.scrollTo(0,1);};
</body>
</html>
