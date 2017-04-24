(function($) {

    let d = document.body;
    let scale;

    let titles = document.querySelectorAll('.header-sticky-withcontent .ce-type-headline h2');
    let title_min_scale = 0.5;

    let subtitles = document.querySelectorAll('.header-sticky-withcontent .ce-type-headline h3');
    let subtitle_min_scale = 0.75;

    let logos = document.querySelectorAll('.title-bar .logo img');
    let logo_min_scale = 0.3;

    let headlines = document.querySelectorAll('.header-sticky-withcontent .ce-type-headline');
    let headline_min_scale = 0.5;

    let scrollheight = window.innerHeight / 3;

    function handleScroll() {
        scale = 1 - d.scrollTop / scrollheight; // magic number
        if (scale <= 1 && scale > title_min_scale) {
            for (let title of titles) {
                title.style.fontSize = `calc(${title.dataset.originalSize} * ${scale}px)`;
            }
        }

        if (scale <= 1 && scale > subtitle_min_scale) {
            for (let subtitle of subtitles) {
                subtitle.style.fontSize = `calc(${subtitle.dataset.originalSize} * ${scale}px)`;
            }
        }

        if (scale <= 1 && scale > logo_min_scale) {
            for (let logo of logos) {
	            logo.style.maxHeight = `calc(${logo.dataset.maxHeight} * ${scale}px)`;
			}
        }

        if (scale <= 1 && scale > headline_min_scale) {
            for (let headline of headlines) {
	            headline.style.paddingTop = `calc(${headline.dataset.paddingTop} * ${scale}px)`;
	            headline.style.paddingBottom = `calc(${headline.dataset.paddingBottom} * ${scale}px)`;
			}
        }
    }

    for (let title of titles) {
        var style = window.getComputedStyle(title, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        title.dataset.originalSize = fontSize;
    }

    for (let subtitle of subtitles) {
        var style = window.getComputedStyle(subtitle, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        subtitle.dataset.originalSize = fontSize;
    }

    for (let logo of logos) {
        var style = window.getComputedStyle(logo, null).getPropertyValue('max-height');
        logo.dataset.maxHeight = parseFloat(style);
    }

    for (let headline of headlines) {
        var paddingTop = window.getComputedStyle(headline, null).getPropertyValue('padding-top');
        headline.dataset.paddingTop = parseFloat(paddingTop);
        var paddingBottom = window.getComputedStyle(headline, null).getPropertyValue('padding-bottom');
        headline.dataset.paddingBottom = parseFloat(paddingBottom);
    }

    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);

})(jQuery);
