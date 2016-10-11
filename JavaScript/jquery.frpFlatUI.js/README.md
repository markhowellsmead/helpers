# jquery.frpFlatUI.js

JavaScript functions to enable enhanced styling options for e.g. form fields. This jQuery plugin does not include any CSS or styling rules.

## Browser support
All current Safari, Chrome and Firefox and IE8+

## Usage

* Depends on jQuery v1.10+
* Link the compiled file ``jquery.frpFlatUI.min.js`` in the ``<head>`` of your document (after ``jQuery.min.js``).
* Call the jQuery function on the required object inline at the bottom of the page, through ``$(document).ready``, or through ``$(window).load``. 

###Example

	$(document).ready(function)({
		$('div.flat input[style="checkbox"]').flat_checkboxes();
	});

## Author
m.howells-mead@frappant.ch, September 2014