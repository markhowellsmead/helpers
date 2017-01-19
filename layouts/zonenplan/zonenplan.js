// @codekit-prepend 'tooltip.js';

var svgPanZoom, Hammer;

(function($, undefined) {

    var $map = $('#zonenplan-svg'),
    	zonesSelected = [],
        dragFlag = 0;

    $map.on('mousedown touchstart', 'polygon, circle, polyline', function() {
        dragFlag = 0;
    });

    $map.on('mousemove touchmove', 'polygon, circle, polyline', function() {
        dragFlag = 1;
    });

    $map.on('mouseup touchend', 'polygon, circle, polyline', function() {
        if (dragFlag === 0) {
            $(this).trigger('regionClicked');
        }
        dragFlag = 0;
    });

    $map.on('regionClicked', 'polygon, circle, polyline', function(e) {
        e.preventDefault();

        var zone = $(this).attr('id');

        if (zone) {
            this.classList.toggle('act'); // addClass etc doesn't work on SVG elements
            if (this.classList.contains('act')) {
                zonesSelected['zone' + zone] = zone;
            } else {
                delete zonesSelected['zone' + zone];
            }
            var $holder = $(this).closest('.svg-holder');
            if (Object.keys(zonesSelected).length > 0) {
                $holder.addClass('act');
            } else {
                $holder.removeClass('act');
            }
        }
    });

    var eventsHandler;

    eventsHandler = {
        haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
        init: function(options) {
            var instance = options.instance,
                initialScale = 1,
                pannedX = 0,
                pannedY = 0;

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = new Hammer(options.svgElement, {
                inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            });

            // Enable pinch
            this.hammer.get('pinch').set({ enable: true });

            // Handle pan
            this.hammer.on('panstart panmove', function(ev) {
                // On pan start reset panned variables
                if (ev.type === 'panstart') {
                    pannedX = 0;
                    pannedY = 0;
                }

                // Pan only the difference
                instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY });
                pannedX = ev.deltaX;
                pannedY = ev.deltaY;
            });

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function(ev) {
                // On pinch start remember initial zoom
                if (ev.type === 'pinchstart') {
                    initialScale = instance.getZoom();
                    instance.zoom(initialScale * ev.scale);
                }

                instance.zoom(initialScale * ev.scale);

            });

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function(e) { e.preventDefault(); });
        },
        destroy: function() {
            this.hammer.destroy();
        }
    };

    var options = {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: true,
        center: true,
        dblClickZoomEnabled: false,
        zoomScaleSensitivity: 0.5,
        minZoom: 1,
        maxZoom: 6,
        customEventsHandler: eventsHandler,
        beforePan: function(oldPan, newPan) {
            var gutterWidth = $map.width(),
                gutterHeight = $map.height(),
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
    };

    var zonenplan = svgPanZoom('#zonenplan-svg', options);

    // $(window).resize(function(){
    //     zonenplan.resetZoom();
    //     zonenplan.resize();
    //     zonenplan.updateBBox();
    //     zonenplan.contain();
    // });

    $('.zoomies').on('click.zoomies', '.zoom-in', function() {
        zonenplan.zoomIn();
    });
    $('.zoomies').on('click.zoomies', '.zoom-out', function() {
        zonenplan.zoomOut();
    });

})(jQuery);
