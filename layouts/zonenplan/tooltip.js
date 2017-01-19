(function($, undefined) {

    var $tooltip, $container, tooltiptext;

    function showTooltip(e) {
        e.stopPropagation();
        var matches = e.currentTarget.id.match(/zone([0-9]+)/);
        if(matches){
            var $el = $(e.currentTarget);
            $tooltip.text(replaceMarkers(tooltiptext, { 0: matches[1] })).show();
        }
    }

    function hideTooltip() {
        $tooltip.hide();
    }

    function replaceMarkers(text, markers) {
        for (var i in markers) {
            text = text.replace('{' + i + '}', markers[i]);
        }
        return text;
    }

    function activate() {
        $container
        // .on('click tab', 'area', function(event) {
        //     event.preventDefault();
        //     addZone(this, event);
        // })
            .on('mouseover', '[id^="zone"]', function(event) {
                event.preventDefault();
                showTooltip(event);
            })
            .on('mouseout', '[id^="zone"]', function(event) {
                event.preventDefault();
                hideTooltip(event);
            });
    }

    $(document).on('ready.tooltip', function() {
        $tooltip = $('<div class="tooltip" />').appendTo('body');
        $container = $('.tx-frpzonemaplibero');
        tooltiptext = $container.data('tooltiptext');
        activate();
    });

    $(document).on('mousemove.tooltip', function(event) {
        $('body[style]').attr('style', '');
        $tooltip.css({
            left: event.pageX + 20,
            top: event.pageY
        });
    });

})(jQuery);
