<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zonenplan für Libero</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<link rel="stylesheet" href="scss/svg.css">
    <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/a456ab86-d739-49a5-9e89-503da5081412.css"/>
    <style>
    .svg-holder {
        max-width: 64rem;
        margin: 0 auto;
        height: 70vh;
    }

    #zonenplan-svg {
        width: 100%;
        height: 100%;
    }

    .svg-pan-zoom_viewport {
        transition: transform 300ms ease-in-out;
    }
    </style>
</head>

<body>
    <div class="tx-frpzonemaplibero">

        <div class="zoomies">
            <button class="zoom-in">Zoom In</button>
            <button class="zoom-out">Zoom Out</button>
        </div>

    	<div class="svg-holder">
    		<?php include 'map/zones_export.svg';?>
    	</div>

    </div>

    <script src="svg-pan-zoom.min.js"></script>
    <script src="init.js"></script>

</body>

</html>
