<?php

require_once('class.frp_xliff.php');
	
//////////////////////////////////////////////////

$app = new Frp_xliff($_GET['key']);

if(!isset($_GET['key'])){?><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title>XLIFF Builder</title>
	<script src="//code.jquery.com/jquery-latest.js"></script>
	<style>
		body 		{line-height: 1.5; font-size: 1.125em; font-family: baskerville}
		code		{color:#a30; font-size:1.125em}
		table 		{border-collapse:collapse; width: 100%; margin-bottom: 1em}
		td 			{padding:.5em .25em}
		tr:nth-child(odd) td {background-color: #f3f3f3}
		.container 	{max-width: 960px; margin: 0 auto}
		.message	{background: silver}
		.message p	{margin: 0}
		.message.status200	{padding: .2em 2%;background: #efe; border: 1px solid #ded}
		.message.status500	{padding: .2em 2%;background: #fee; border: 1px solid #edd}
	</style>
</head>
<body>
	<div class="container">
		<h1>XLIFF Konvertierungstool</h1>
		<h2>CSV generieren</h2>
		<ol>
			<li>Die XLIFF-Dateien in ein Unterverzeichnis des Hauptverzeichnisses <code>xliff/EXT_KEY</code> kopieren.</li>
			<li>Diese Seite neu laden.</li>
			<li>Auf den passenden Link klicken.</li>
			<li>Generierte CSV-Dateien werden pro XLIFF-Quelldatei in <code>xliff/__generated</code> (mit aktuellem Zeitstempel) abgelegt.</li>
		</ol>
		<h2>XLIFF aus CSV generieren</h2>
		<ol>
			<li><strong>Quelltexte und Übersetzungen dürfen momentan kein HTML enthalten.</strong></li>
			<li>Die CSV-Datei muss UTF-8-kodiert sein, mit UNIX Zeilenumbrüchen.</li>
			<li>Die CSV-Datei muss mit Tabulator-getrennten Spalten vorbereitet werden.</li>
			<li>Spaltenköpfe müssen korrekt sein, da die Sprachen daraus gelesen werden. Normalerweise sind diese zB <code>key	source	de	fr	it</code>. (Wurde die ursprüngliche CSV mit diesem Tool generiert, stimmen sie überein.)</li>
			<li>Die CSV-Datei soll gleich wie die zu erstellende XLIFF-Datei heissen aber mit Suffix .csv. zB <code>locallang.csv</code> oder <code>locallang_db.csv</code>.</li>
			<li>Die CSV-Datei(-ein) bei <code>xliff/EXT_KEY</code> ablegen.</li>
			<li>Auf den passenden Link klicken.</li>
			<li>Generierte XLIFF-Dateien werden in <code>xliff/EXT_KEY</code> abgelegt.</li>
		</ol>
		<?php $app->showFolderList();?>
		<div class="message"></div>
	</div>
</body>
</html><?php

}else{
		
	header('Content-Type: text/text; charset=utf-8');

	switch($_GET['mode']){
		case 'merge':
			$app->mergeFiles();
			break;
		case 'split':
			$app->splitFiles();
			break;
		case 'makesingle':
			$app->makeSingleLanguageFile();
			break;
	}
}
?>