/**
 * SlideMe v1.x
 * ======================
 *
 * SlideMe is a simple gallery slider.
 *
 * @author Jan Putzan
 * @author Email: jan.putza@gmail.com
 * @author GitHub: https://github.com/janputzan
 *
 */

(function($) {

	$.fn.slideMe = function(options) {

		/*default settings*/

		var settings = $.extend({
			
			interval: 	5000,
			fadeIn: 	500,

		}, options);
		
		/*variables*/

		var images = this.find('img');

		var controlsDiv = $('<div class="controls"></div>');

		var that = this;

		/*append controls div*/

		this.prepend(controlsDiv); 

		/* Event handlers */

		images.each(function(i) {

			/* create image toggle */

			var toggle = $('<i class="small"></i>');

			var image = $(this);

			/* Event handler for image */

			image.click(function() {

				$.fn.slideMe.nextImage(images, controlsDiv, settings);
			});

			/* add class to toggle */
			if (i == 0) {

				toggle.addClass('mdi-toggle-radio-button-on');
			
			} else {

				toggle.addClass('mdi-toggle-radio-button-off');
			}

			/* event handler for toggle */

			$(toggle).click(function() {

				images.each(function() {

					$(this).hide();
				});

				image.fadeIn(settings.fadeIn);

				that.find('i').removeClass('mdi-toggle-radio-button-on').addClass('mdi-toggle-radio-button-off');

				$(this).addClass('mdi-toggle-radio-button-on');
			});

			/* append toggle */

			that.find('.controls').append(toggle);

		});

		/* hide all images apart from the first one */
		images.not(':first').hide();

		/* set the interval */
		window.setInterval(function() {
			$.fn.slideMe.nextImage(images, controlsDiv, settings); 
		}, settings.interval);

		return this;
	};

	$.fn.slideMe.nextImage = function(images, controlsDiv, settings) {

		var count;

		/* get current image */
		
		var current = images.filter(function(i) {

			if ($(this).css('display') == 'inline') {

				count = i;
				controlsDiv.find('i:eq(' + i + ')').removeClass('mdi-toggle-radio-button-on').addClass('mdi-toggle-radio-button-off');
				return $(this).hide();
			}
		});

		/* show next image */

		if (count < (images.length) - 1) {

			current.next().fadeIn(settings.fadeIn);

			controlsDiv.find('i:eq(' + (count + 1).toString() + ')').removeClass('mdi-toggle-radio-button-off').addClass('mdi-toggle-radio-button-on');
		
		} else {

			images.first().fadeIn(settings.fadeIn);

			controlsDiv.find('i:eq(0)').removeClass('mdi-toggle-radio-button-off').addClass('mdi-toggle-radio-button-on');
		}
	}

}(jQuery));