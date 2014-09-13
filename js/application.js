$(function() {
	// menu
	var config = {    
         sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
         interval: 200,  // number = milliseconds for onMouseOver polling interval    
         over: doOpen,   // function = onMouseOver callback (REQUIRED)    
         timeout: 200,   // number = milliseconds delay before onMouseOut    
         out: doClose    // function = onMouseOut callback (REQUIRED)    
    };
    
    function doOpen() {
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    }
 
    function doClose() {
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    }

    $("ul.dropdown li").hoverIntent(config);
    
    $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ")
	
	// testimonials
	$('#rotate').rotaterator({
		fadeSpeed:1200,
		pauseSpeed:6000
	});
	
	// zebra stripe tables
	//$("section tr:nth-child(odd)").addClass("odd");
	$("table.striped tr:nth-child(odd)").addClass("odd");
	$("table.labels td:nth-of-type(odd)").addClass("odd");
	
	// expand/collapse faq's
	$('dl.expand dt').click(function(){
		$(this)
			.toggleClass('bold')
			.nextUntil('dt')
			.toggle('fast');	
			return false;
	});
	
	// lightbox
	$('a[rel=lightbox]').lightBox({
		imageBtnClose: '/images/lightbox-btn-close.gif',
		imageBtnPrev: '/images/lightbox-btn-prev.gif',
		imageBtnNext: '/images/lightbox-btn-next.gif'
	});	
});