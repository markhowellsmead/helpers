<?php

require_once('class.View_CalendarMonth.php');

$month 	= 6;
$year 	= 2013;

$calendar = new View_CalendarMonth($month,$year);

$monthname = strftime('%B %Y',strtotime('1.' .$month. '.'.$year));

?><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title>View_CalendarMonth</title>
    <style>
    
    	/*
    		css isn't a required part of this solution.
    		it's just to make it look a bit nicer!
    	*/
    	
    	body {
	    	font-family:helvetica,sans-serif;
    	}
	    
	    table {border-collapse: collapse}
	    td {
		    padding:1em;background:#eee;
		    border:1px solid #999;
		    text-align:center;
	    }
	    
	    td.empty 	{background-color:#f9f9f9}
	    td.weekend 	{color:#bbb}
	    td.today 	{background-color:#f0fff0}
	    
    </style>

</head>
<body>

<h1><?php echo $monthname;?></h1>
<?php echo $calendar->viewData;?>
</body>
</html>