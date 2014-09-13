//	DSlider jQuery slider.						//
//	Visit Dimics.com for the tutorial about this slider.	//

$(document).ready(function(){
	var slides = $(".slide").length;					//counts the number of slides there are
	var slideWidth = $(".slide").outerWidth();			//gets the width of a slide
	var currentSlide = 1;						//keeps track of the slide thats visible
	var leftMax = slideWidth * -1 * slides + slideWidth;	//gets the maximum ammount of animation (for navigating to last slide)
	
	$("#slides").css({"width" : slides * slideWidth});	//sets the with of the slides div, so you can make as many slides as you want
	
	$("#buttonPrev").click(function(){								//when buttonPrev is clicked start the function
		if (currentSlide == 1)									//when the first slide is selected, we want to animate to the last slide
		{
			$("#slides").animate({left : + leftMax + "px"}, 600);			//animate to the last slide, to the maximum animation
			currentSlide = slides;								//update the currentSlide variable to last slide
		}
		else												//if the current slide is not one we want to go one slide back
		{
			$("#slides").animate({left : "+=" + slideWidth + "px"}, 600);		//animate one time the slideWidth back
			currentSlide = currentSlide - 1;						//update currenSlide variable
		};
	});
	
	$("#buttonNext").click(function(){								//when buttonNext is clicked start the function
		if (currentSlide == slides)								//when the last slide is selected we want to animate to the first slide
		{
			$("#slides").animate({left : "0px"}, 600);					//animate to the minimun left, 0, get back to the start position
			currentSlide = 1;									//set currentSlide variable to 1
		}
		else 												//if the current slide is not the last slide we want to go forward one slide
		{
			$("#slides").animate({left : "-=" + slideWidth + "px"}, 600);		//animate one time the slide forward
			currentSlide = currentSlide + 1;						//update currentslide variable
		};
	});
	
});