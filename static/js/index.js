// JavaScript Document

//jcarousel
(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();

                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
})(jQuery);

//stuff for the full page tabs
function openPage(pageName, elmnt, color) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
	}

	// Remove the background color of all tablinks/buttons
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
	tablinks[i].style.backgroundColor = "";
	}

	// Show the specific tab content
	document.getElementById(pageName).style.display = "block";

	// Add the specific color to the button used to open the tab content
	elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it (opening home by default)
document.getElementById("defaultOpen").click();

//this function runs at the start
$(function() {
	$('.gif-click').hide();
	$("#enlarged-image-wrapper").hide();

    $('.click').click(function() {
		$(this).find('img').toggle();
		let parent = $(this).parent();
		parent.find('.gif-click').toggle();
		parent.find('.pic-click').toggle();
	});

	$('.jcarousel-control-prev img').addClass("do-not-enlarge");
	$('.jcarousel-control-next img').addClass("do-not-enlarge");
	$('button img').addClass("do-not-enlarge");
	$("img:not(.do-not-enlarge)").click(enlargeImage);

	$("img[data-caption]").each(createCaption);
	$("img[data-caption-mobile]").each(createCaptionMobile)

	//gif player
	$('.gifplayer').gifplayer();

	if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
		window.location="/m"
	}
});

//creates all the captions for the images
function createCaption(x,image) {
	var imagewrapper = document.createElement("div");
	$(imagewrapper).addClass("imagewrapper");
	imagewrapper.setAttribute("style","grid-area:"+image.getAttribute("data-grid-area"))

	let parent= image.parentElement;

	parent.appendChild(imagewrapper);
	imagewrapper.appendChild(image);

	var caption = document.createElement("div");
	$(caption).addClass("caption");

	var captionText = document.createElement("h4");
	captionText.innerHTML = image.getAttribute("data-caption");

	caption.appendChild(captionText);

	imagewrapper.appendChild(caption);
}

//creates all captions for mobile (they are always visible)
function createCaptionMobile(x,image) {
	var imagewrapper = document.createElement("div");
	$(imagewrapper).addClass("imagewrapper");
	imagewrapper.setAttribute("style","grid-area:"+image.getAttribute("data-grid-area"))

	let parent= image.parentElement;

	parent.appendChild(imagewrapper);
	imagewrapper.appendChild(image);

	var caption = document.createElement("div");
	$(caption).addClass("caption-mobile");

	var captionText = document.createElement("h3");
	captionText.innerHTML = image.getAttribute("data-caption-mobile");

	caption.appendChild(captionText);

	imagewrapper.appendChild(caption);
}

$("img").hover(showCaption, hideCaption);

//shows caption on hover
function showCaption() {
	let parent= $(this).parent()
	let caption = parent.find(".caption")


	$(caption).animate({bottom: 0}, {duration:250, queue: false});

	$(caption).animate({opacity: 1}, {duration: 250, queue: false, easing: 'easeInQuad'})

}

//hides caption when mouse leaves
function hideCaption() {
	let parent= $(this).parent()
	let caption = parent.find(".caption")

	$(caption).animate({bottom: -20}, {duration:250, queue: false});
	$(caption).animate({opacity: 0}, {duration: 250, queue: false, easing:"easeOutQuad"})
}

//enlarges image on click
function enlargeImage() {
	let imgsrc = this.src;
	let parent= $(this).parent()
	let caption = parent.find(".caption")

	let enlarged_image = $("#enlarged-image");
	enlarged_image.attr("src",imgsrc);
	// $("#enlarged-image").attr("data-caption",this.getAttribute("data-caption"))\

	let enlarged_wrapper = $("#enlarged-image-wrapper");
	enlarged_wrapper.show();
}

$("#enlarged-image-wrapper").click(hideEnlargedImage);

function hideEnlargedImage() {
	$("#enlarged-image-wrapper").hide();
}
