<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Zonenplan für Libero</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<link rel="stylesheet" href="scss/svg.css">
    <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/a456ab86-d739-49a5-9e89-503da5081412.css"/>
</head>

<body>
    <div class="tx-frpzonemaplibero">

        <div class="zoomies">
            <button class="zoom-in">Zoom In</button>
            <button class="zoom-out">Zoom Out</button>
            <input type="range" class="zoom-range">
        </div>

    	<div class="svg-holder">
    		<?php include 'map/zones_export.svg';?>
    	</div>

    </div>

    <script src="jquery.panzoom.min.js"></script>
    <script src="jquery.rwdImageMaps.min.js"></script>
    <script src="init.js"></script>

</body>

</html>
