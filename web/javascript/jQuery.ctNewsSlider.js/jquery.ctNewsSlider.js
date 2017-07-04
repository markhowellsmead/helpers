(function ($) {

	/**
	 * Extends the jQuery function object with a news slider
	 * Usage (on e.g. document ready): 
	 * $('.builder-partial .js-masonry').ctNewsSlider(); 
	 * or
	 * $('.builder-partial .js-masonry').ctNewsSlider({ keyBreakpoint: 640 });
	 * mhm since 4.7.2017
	 */
	$.extend($.fn, {
		ctNewsSlider: function (options) {

			var width = $(window).width(),
				height = $(window).height(),
				initialized = false,
				timeout = null,

				sliderContainer = $(this),
				slides = $('.slider-item', sliderContainer),

				sliderCount = slides.length,
				firstElement = slides.first();

			options = $.extend({}, $.fn.ctNewsSlider.defaults, options);

			var destroySlider = function () {
				$('.slider-control', sliderContainer).remove();
				clearTimeout(timeout);
				$('html').removeClass('news-slider-is--active');
			};

			/**
			 * Function to move to the next or previous slide
			 * @param  {string} direction In which direction should we move?
			 */
			var slide = function (direction) {
				if (direction === 'next') {
					nextElement = $('.slider-item.active', sliderContainer).removeClass('active').next('.grid-item');

					if (nextElement.length === 0) {
						$('.slider-item', sliderContainer).first().addClass('active');
					} else {
						nextElement.addClass('active');
					}

				} else {
					nextElement = $('.slider-item.active').removeClass('active').prev('.grid-item');

					if (nextElement.length === 0) {
						$('.slider-item', sliderContainer).last().addClass('active');
					} else {
						nextElement.addClass('active');
					}

				}
				$('.counter', sliderContainer).text($('.slider-item.active', sliderContainer).index() + '/' + sliderCount);
				sliderContainer.height(firstElement.outerHeight());
			};

			/**
			 * Initialize slider
			 */
			var initSlider = function () {
				$('.slider-control', sliderContainer).remove();
				firstElement.addClass('active');
				timeout = setTimeout(function () {
					sliderContainer.height(firstElement.outerHeight());

					sliderContainer.after('<div class="slider-control"><span class="slider-prev icon-cti-angle-right"></span><span class="counter">1/' + sliderCount + '</span><span class="slider-next icon-cti-angle-right"></span></div>');

					$('.slider-prev', sliderContainer).on('click', function () {
						slide('prev');
					});

					$('.slider-next', sliderContainer).on('click', function () {
						slide('next');
					});
				}, 200);

				if (sliderCount === 1) {
					slides.addClass('active');
					sliderContainer.height(firstElement.outerHeight());
				}
				$('html').addClass('news-slider-is--active');
			};

			/**
			 * Add window event handlers
			 */
			$(window).on('resize.initslider', function (event) {
				if (($(window).width() !== width || $(window).height() !== height) || initialized === false) {
					if (sliderCount > 1) {
						clearTimeout(timeout);
						if ($(window).width() < keyBreakpoint) {
							initSlider();
						} else {
							destroySlider();
						}
					}
					initialized = true;
				}
			});

			$(window).on('orientationchange', function () {
				initialized = false; // force re-initialization because of possible resolution change
				setTimeout(function () {
					$(window).trigger('resize.initslider');
				}, 500);
			});

			if ($(window).width() < options.keyBreakpoint && sliderCount > 1) {
				initSlider();
			}

			return this;
		}
	});

	// Do not edit these default values
	// Override them when you call the function
	$.fn.ctNewsSlider.defaults = {
		keyBreakpoint: 768
	};

}(jQuery));
