var svgPanZoom;

(function($, undefined) {

    var zonesSelected = [], dragFlag = 0;

    $('svg').on('mousedown', 'polygon, circle, polyline', function() {
        dragFlag = 0;
    });

    $('svg').on('mousemove', 'polygon, circle, polyline', function() {
        dragFlag = 1;
    });

    $('svg').on('mouseup', 'polygon, circle, polyline', function() {
        if (dragFlag === 0) {
            $(this).trigger('regionClicked');
        }
        dragFlag = 0;
    });

    $('svg').on('regionClicked', 'polygon, circle, polyline', function(e) {
        e.preventDefault();

        var zone = $(this).attr('id');

        if (zone) {
            this.classList.toggle('act'); // addClass etc doesn't work on SVG elements
            if (this.classList.contains('act')) {
                zonesSelected['zone' + zone] = zone;
            } else {
                delete zonesSelected['zone' + zone];
            }
            if (Object.keys(zonesSelected).length > 0) {
                $('.svg-holder').addClass('act');
            } else {
                $('.svg-holder').removeClass('act');
            }
        }
    });

        var zoneplan = svgPanZoom('#zonenplan-svg', {
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,
            center: true,
            dblClickZoomEnabled: false,
            zoomScaleSensitivity: 1,
            minZoom: 1,
            maxZoom: 6,
            beforePan: function(oldPan, newPan) {
                var gutterWidth = $(window).width() * 2 / 3,
                    gutterHeight = $(window).height() * 2 / 3,
                    sizes = this.getSizes(),
                    leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth,
                    rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom),
                    topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight,
                    bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

                var customPan = {};
                customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
                customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

                return customPan;
            }
        });

        $('.zoomies').on('click.zoomies', '.zoom-in', function() {
            zoneplan.zoomIn();
        });
        $('.zoomies').on('click.zoomies', '.zoom-out', function() {
            zoneplan.zoomOut();
        });

})(jQuery);
