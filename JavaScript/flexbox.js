/*
	**************************************************
	CSS Flexbox helpers
	mhm 22.7.2014
	
	e.g. if you need a row of boxes to all be the same height

	See frappant_helpers/less/flexbox.less for a full description.
	This JavaScript requires jQuery.
*/

(function($,window,document,undefined){
	'use strict';
 
	var s = document.body || document.documentElement, s = s.style;
	if( s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' ) return true;
 
	var $list	   = $( '.module.row' ),
		$items	  = $list.find( '.module.column' ),
		setHeights  = function()
		{
			$items.css( 'height', 'auto' );
 
			var perRow = Math.floor( $list.width() / $items.width() );
			if( perRow == null || perRow < 2 ) return true;
 
			for( var i = 0, j = $items.length; i < j; i += perRow )
			{
				var maxHeight   = 0,
					$row		= $items.slice( i, i + perRow );
 
				$row.each( function()
				{
					var itemHeight = parseInt( $( this ).outerHeight() );
					if ( itemHeight > maxHeight ) maxHeight = itemHeight;
				});
				$row.css( 'height', maxHeight );
			}
		};
 
	setHeights();
	$( window ).on( 'resize', setHeights );
	$list.find( 'img' ).on( 'load', setHeights );
 
})( jQuery, window, document );