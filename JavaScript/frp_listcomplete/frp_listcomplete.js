/*
 * Autocomplete function for a UL-based list of entries. The functionality is 
 * added to a containing element, which contains a UL with the class 'list'. 
 * 
 * This UL must contain one or more LIs with the class 'listitem', each of which 
 * must include a 'data-name' attribute, with the value against which the search 
 * term will be matched.
 * 
 * The script makes an array of referenced elements when it is initialized.
 * The search function then works directly with the array.
 *
 * When the search is executed and results are found, then each DOM element 
 * receives the class name 'visible'. The visibility/invisibility of matching 
 * elements is controlled by CSS, not by JavaScript.
 *
 * When the search is executed, the class name 'visible' is removed from all 
 * list elements.
 *
 * A keydown event handler is implemented so that users can navigate up/down the 
 * list of matching results with the keyboard and then press [ENTER] to go to the 
 * selected page.
 *
 * Usage: $('.mod.nav.pages').frp_listcomplete();
 *
 * HTML: 
 *
 * @since 18/04/16 ~ mhm
*/

var console = window.console;

(function($){
    
    if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;
            
            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    if( !String.prototype.replaceArray ){
        String.prototype.replaceArray = function(find, replace) {
            var replaceString = this;
            var regex; 
            for (var i = 0; i < find.length; i++) {
                regex = new RegExp(find[i], "g");
                replaceString = replaceString.replace(regex, replace[i]);
            }
            return replaceString;
        };
    }

	var FrpListcomplete = function(container){

		var _list, _listitems = [], _filteritems = [], _currentselected = -1, _searchfield = null,
		    UP = 38, DOWN = 40, ENTER = 13,
		    _container = $(container);

		/**
		 * JS array-based search and replace, like PHP's preg_replace function.
         * Define any non-standard characters here with their normalized alternatives.
		 */
		var _normalizeForSearch = function(string){
            return string ? string.toLowerCase().replaceArray(['â','ä','ö','ü','ß','ç','–','—'], ['a','a','o','u','ss','c','-','-']) : '';
		};


        /**
         * Resets all formerly selected items in the list
         * and resest the _currentselected flag to its initial value.
         */
        var _resetSelectedCounter = function(){
            $('.listitem.visible', _list).removeClass('selected');
            _currentselected = -1;
        };


        /**
         * Removes class 'selected' from former list item
         * and adds it to the one indicated by _currentselected
         */
        var _setSelectedListItem = function(){
            $('.listitem.visible', _list).removeClass('selected');
            $($('.listitem.visible', _list).get(_currentselected)).addClass('selected');
        };


        /**
         * Handle keyboard interaction with up, down and enter keys.
         */
        var _updown = function(event){

            event.preventDefault();

            switch(event.keyCode){

                case DOWN:

                    if( _currentselected === $('.listitem.visible', _list).length-1 ){
                        _currentselected = -1;
                    }

                    _currentselected++;
                    
                    _setSelectedListItem();

                    break;

                case UP:

                    if( _currentselected <= 0 ){
                        _currentselected = $('.listitem.visible', _list).length-1;
                    }else{
                        _currentselected--;
                    }

                    _setSelectedListItem();

                    break;

                case ENTER:

                    /* 
                        At this point, there should be a single listitem selected. So we want to send the browser 
                        to the URL indicated by the first link in the listitem.
                        
                        jQuery weirdness: triggering the click event doesn't send the browser to the next page.
                        Perhaps because the link is usually hidden, so automatically clicking it could be 
                        construed as a security issue.
                    */
                    if( $('.listitem.selected a:first', _list).length === 1){
                        var targetURL = $('.listitem.selected a:first', _list).attr('href');
                        _resetSelectedCounter();
                        window.location = targetURL;
                    }
                    break;
            }

        };


        /**
         * Reset the visibility status of the list (i.e. hide all entries).
         */
        var _emptyList = function(){
            _searchfield.val('');
            _list.removeClass('visible');
            _listitems.removeClass('visible selected');
            _currentselected = -1;
        };


        /**
         * Main search function, run via event triggers on the search field
         */
        var _runSearch = function(event){

            if( !(event.keyCode === ENTER || event.keyCode === UP || event.keyCode === DOWN) ){

                _list.removeClass('visible');
                _listitems.removeClass('visible selected');
    
    			var searchstring = $(event.target).val();
    
    		    if( searchstring.length > 1 ){
    
           			searchstring = _normalizeForSearch(searchstring);
    
        			_filteritems.find(function(entry){
            			if(entry.name.indexOf(searchstring) >-1){ // entry.name is pre-normalized during initialization
                			entry.listentry.addClass('visible');
                			_list.addClass('visible');
            			}
        			});
        			
        			if (!$('.listitem.visible', _list).length ){
            			$(event.target).trigger('frp_listcomplete:listempty');
        			}
        			
        			if(searchstring.length && !$('.listitem.visible', _list).length){
            			$(event.target).addClass('error');
                    }else{
            			$(event.target).removeClass('error');
        			}

    		    }else{
                    $(this).removeClass('error');
    		    }
            }

		};
		
		
		/**
		 * Watches the keydown event to see if we're using the up, down or enter key
		 */
        var _keyDownHandler = function(event){
            if(event.keyCode === ENTER || event.keyCode === UP || event.keyCode === DOWN){
                event.preventDefault();
                _updown(event);
            }
        };


        /**
         * Run main initialization.
         */
		if(_container.length){
    		
    		_searchfield = $('[name="stationsearch-searchfield"]', _container);

			_list = $('.list', _container);
			_listitems = $('.listitem', _list);
			
   			_listitems.each(function(){
                /*
                 Build a list of items which match the requirements:
                 only add the list item if it has a data-name attribute.
                */           			
    			
    			if( $(this).data('name') ){
        			_filteritems.push({
            			name: _normalizeForSearch($(this).data('name')),
            			listentry: $(this)
        			});
    			}
			});

			if( !_filteritems.length ){
    			window.console && window.console.warn('frp_listcomplete - container contains no valid list items.');

			}else{
    			
    			/*
                 Add the keyup event handler to the search field, into which the 
                 visitor will type the search text. The search function will kick 
                 in if the search string contains two or more cheracters. If the 
                 search string contains less than two characters, then the field
                 will be marked with a highlighting class name.
    			*/

    			_searchfield
        			.val('')
    			    .on('keydown.fcl', _keyDownHandler)
    			    .on('keyup.fcl', _runSearch)
                    .on('frp_listcomplete:listempty', _emptyList)
                    .on('click.fcl', _resetSelectedCounter);

			}
			
			_emptyList();
			
			$(window).on('pagehide beforeunload', function(){
    			_emptyList();
			});

		}else{
			window.console && window.console.warn('frp_listcomplete - no matching list element found');
		}

	};

	/**
	 * Functionality defined. Now add it to jQuery so that we can apply it to a specific DOM object.
	 */
	$.fn.frp_listcomplete = function(){
        new FrpListcomplete(this);
        return this; // Maintain jQuery chaining
	};

})(jQuery);