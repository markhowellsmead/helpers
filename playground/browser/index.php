<!DOCTYPE html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="style.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="browsertest.js"></script>
	<!--script type="text/vbscript" src="browsertest.vb.js"></script-->
</head>
<body>
<div class="scrollable">
    <div class="wrap">
		<div id="main">
			<a href="http://www.frappant.ch"><img src="frappant_cube_256.png" class="cube" alt="frappant.ch"></a>
			<p>Besten Dank für Ihren Besuch.</p>
			<button class="data">Diese Information an !frappant zusenden</button>
			<h1>Sie benutzen <script>basicBrowserInfo()</script></h1>
			<div class="data">
				<h2>Browserinformationen</h2>
				<script>
					info();
				</script>
				<!--h2>Plugins</h2>
				<script>
					//pluginabfrage();
				</script-->
			</div>
		</div>
    </div>
</div>
<script src="send.js"></script>
</body>
</html>