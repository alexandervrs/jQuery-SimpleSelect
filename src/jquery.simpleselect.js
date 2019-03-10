
/**
 * Customizes select controls simply across browsers with jQuery
 *
 * @author  Alexander Vourtsis
 * @version	1.0.0
 * @updated	18 September 2012, 20:26 UTC+02:00
 * @license	The Unlicense
 */

jQuery.fn.simpleSelect = function(options) {

	var defaults = {
		width: 0,
		height: 0,
		rightIndent: 30,
		border: 0,
		defaultText: '',
		selectHoverClass: 'vrs-simple-select-overlay-hover',
		arrowHoverClass: 'vrs-simple-select-arrow-hover',
		selectFocusClass: 'vrs-simple-select-overlay-focus',
		arrowFocusClass: 'vrs-simple-select-arrow-focus'
	};
	
	var options = $.extend(defaults, options);

	return this.each(function() {
		
		/* in case width/height is not set, then get the dimensions from the CSS */
		if (options.width == 0) {
			options.width = parseInt($(this).css('width'), 10);
		}
		
		if (options.height == 0) {
			options.height = parseInt($(this).css('height'), 10);
		}
		
		if ($(this).css('display') != 'block') {
			var thisDisplay = 'inline-block';
		} else {
			var thisDisplay = 'block';
		}
		
		/* setup plugin divs for each element */
		$(this).wrap('<div class="vrs-simple-select-container"></div>');
		$(this).before('<div class="vrs-simple-select-overlay"></div>');
		$(this).before('<div class="vrs-simple-select-arrow"></div>');
		$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').wrapInner('<div class="vrs-simple-select-text"></div>');
		
		/* CSS setup */
		$(this).css({
			'position': 'absolute',
			'min-width': options.width+'px',
			'height': options.height+'px',
			'z-index': parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').css('z-index'), 10)+1,
			'opacity': '0'
		});
		
		$(this).closest('.vrs-simple-select-container').css({
			'width': options.width+'px',
			'height': options.height+'px',
			'float': $(this).closest('select').css('float'),
			'display': thisDisplay
		});
		
		$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').css({
			'width': options.width+'px',
			'height': options.height+'px',
			'border': options.border,
			'border-radius': $(this).closest('select').css('border-radius')
		});
		
		$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').css({
			'width': options.width-parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').css('width'), 10)-options.rightIndent+'px',
		});
		
		$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').css({
			'height': parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').css('height'), 10)+'px'
		});

		$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').css({
			'top': parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').css('height'), 10)/2-parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').css('font-size'), 10)+5+'px',
			'height': parseInt($(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').css('font-size'), 10)+5+'px',
			'white-space':'pre',
			'text-overflow': 'ellipsis'
		});
		
		/* reset the margin/padding of the select */
		$(this).closest('select').css({
			'margin': '0',
			'padding': '0',
			'border': '0'
		});
		
		/* if defaultText exists then display that, otherwise show the "selected" text from the <option>s */
		if (options.defaultText != '') {
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').text(options.defaultText);
		} else {
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').text( $(this).find("option:selected").text() );
		}
		
		/* change display text on change event */
		$(this).change(function(){
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').children('.vrs-simple-select-text').text( $(this).find("option:selected").text() );
		});
		
		/* rollover effects */
		$(this).focus(function(){
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').removeClass(options.selectHoverClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').removeClass(options.arrowHoverClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').addClass(options.selectFocusClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').addClass(options.arrowFocusClass);
		});
		
		$(this).mouseover(function(){
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').addClass(options.selectHoverClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').addClass(options.arrowHoverClass);
		});
		
		$(this).blur(function(){
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').removeClass(options.selectFocusClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').removeClass(options.arrowFocusClass);
		});
		
		$(this).mouseout(function(){
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-overlay').removeClass(options.selectHoverClass);
			$(this).closest('.vrs-simple-select-container').children('.vrs-simple-select-arrow').removeClass(options.arrowHoverClass);
		});
	
	});
};
