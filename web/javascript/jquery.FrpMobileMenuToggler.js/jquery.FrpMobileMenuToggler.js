(function($, undefined){

    if(!$.FRP){$.FRP = {};}
    $.FRP.MobileMenu = {};

    $.FRP.MobileMenu.bodyClickFn = function(e) {
        if (!$(e.target).hasClass('frp-mobilemenu') && !$(e.target).parents('.frp-mobilemenu').length ) {
            $.FRP.MobileMenu.resetMenu();
            $(document).off('touchstart.frp-mobilemenu-is-open click.frp-mobilemenu-is-open');
        }
    };

    $.FRP.MobileMenu.resetMenu = function(){
        $('html').removeClass('frp-mobilemenu-is-open');
        if($(document).data('frp-mobilemenu-buttons').length){
            $(document).data('frp-mobilemenu-buttons').removeClass('is-open');
        }
    };

    //////////////////////////////////////////////////

    $.fn.extend({
        FrpMobileMenuToggler: function() {
            
            $(document).data('frp-mobilemenu-buttons', $(this));
            
            $(this).off('click.FrpMobileMenuToggler').on('click.FrpMobileMenuToggler', function(e){
                e.preventDefault();
                $('html').toggleClass('frp-mobilemenu-is-open');
                $(this).toggleClass('is-open');
                $(document).on('touchstart.frp-mobilemenu-is-open click.frp-mobilemenu-is-open', $.FRP.MobileMenu.bodyClickFn);
            });
            
            $(window).on('debouncedresize', $.FRP.MobileMenu.resetMenu);

            return this;
        }
    });

})(jQuery);