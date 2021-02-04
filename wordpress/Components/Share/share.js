(function ($) {
    var windowAtts = function (width, height) {
        if (window.innerWidth > width && window.innerHeight > height) {
            return (
                'width=' +
                width +
                ',height=' +
                height +
                ',top=' +
                (window.innerHeight / 2 - height / 2) +
                ',left=' +
                (window.innerWidth / 2 - width / 2)
            );
        } else {
            return '';
        }
    };

    $('[data-shareto]').on('click.share', function (event) {
        switch ($(this).data('shareto')) {
            case 'facebook':
                event.preventDefault();
                window.open($(this).attr('href'), '_blank', windowAtts(710, 565));
                break;

            case 'twitter':
                event.preventDefault();
                window.open($(this).attr('href'), '_blank', windowAtts(550, 285));
                break;
        }
    });
})(jQuery);
