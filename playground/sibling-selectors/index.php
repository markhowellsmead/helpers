<!DOCTYPE html>
<html>
<head>
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title>Sibling selectors</title>
    
    <style>
		body {
		    line-height: 1.5;
		    background-color: #ddd;
		}
		
		address {display: block;margin: 1em 0}
		
		/* Android 2.3 :checked fix */
		@keyframes fake {
		    from {
		        opacity: 1;
		    }
		    to {
		        opactity: 1
		    }
		}
		body {        
		    animation: fake 1s infinite;
		}
		
		.radio-tabs .state {
		    position: absolute;
		    left: -10000px;
		}
		#starks:focus ~ .tabs #starks-tab,
		#lannisters:focus ~ .tabs #lannisters-tab,
		#targaryens:focus ~ .tabs #targaryens-tab {
		    box-shadow: 0 0 3px -3px rgba(0,127,255,.1);
		}
		
		.radio-tabs .tab {
		    display: inline-block;
		    padding: .5em;
		    vertical-align: top;
		    background-color: #eee;
		    cursor: hand;
		    cursor: pointer;
		}
		.radio-tabs .tab:hover {
		    background-color: #fff;
		}
		#starks:checked ~ .tabs #starks-tab,
		#lannisters:checked ~ .tabs #lannisters-tab,
		#targaryens:checked ~ .tabs #targaryens-tab {
		    background-color: #fff;
		    border-bottom: .3em solid #fff;
		    cursor: default;
		}
		
		.radio-tabs .panels {
		    background-color: #fff;
		    padding: .5em;
		}
		.radio-tabs .panel {
		    display: none;
		}
		#starks:checked ~ .panels #starks-panel,
		#lannisters:checked ~ .panels #lannisters-panel,
		#targaryens:checked ~ .panels #targaryens-panel {
		    display: block;
		}
    </style>

</head>
<body>

<h1>Sibling selectors in CSS3</h1>
<p>Tabs without JavaScript. IE7+ and all others.</p>
<address><a href="http://alistapart.com/article/radio-controlled-web-design">Source</a></address>

<div class="radio-tabs">
  
    <input class="state" type="radio" title="Starks" name="houses-state" id="starks" checked />
    <input class="state" type="radio" title="Lanisters" name="houses-state" id="lannisters" />
    <input class="state" type="radio" title="Targaryens" name="houses-state" id="targaryens" />

    <div class="tabs">
        <label for="starks" id="starks-tab" class="tab">Starks</label>
        <label for="lannisters" id="lannisters-tab" class="tab">Lannisters</label>
        <label for="targaryens" id="targaryens-tab" class="tab">Targaryens</label>
    </div>

    <div class="panels">
        <ul id="starks-panel" class="panel active">
            <li>Eddard</li>
            <li>Caitelyn</li>
            <li>Robb</li>
            <li>Sansa</li>
            <li>Brandon</li>
            <li>Arya</li>
            <li>Rickon</li>
        </ul>
        <ul id="lannisters-panel" class="panel">
            <li>Tywin</li>
            <li>Cersei</li>
            <li>Jamie</li>
            <li>Tyrion</li>
        </ul>
        <ul id="targaryens-panel" class="panel">
            <li>Viserys</li>
            <li>Daenerys</li>
        </ul>
    </div>

</div>


</body>
</html>