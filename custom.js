
var $j = jQuery.noConflict();

$j(function() {

	// comment next lines to disable features

	lightBox(); // initialize & configure lightbox script

	navigation(); // dynamic light selection in the menu (windows7-like)

	if ($j("form#contact").length > 0) contactForm(); // initialize javascript validators for the contact form

	if ($j("#slides img").length > 1) setInterval("slides()", getMeta("pandora.1")); // slide timer

	if ($j("#newsline").length > 0) setInterval("newsline()", getMeta("pandora.2")); // news timer

	if ($j("#folio").length > 0) folio(500, 0.6); // portfolio sleek image shade (timer, opacity)

});


// functions

function getMeta($name) {
	return $j("meta[name=" + $name + "]").attr('content');
}

function contactForm() {

	$j(".input", "form#contact").blur(function() { validateInput($j(this)); }); // validate when unfocus

	$j("#submit", "form#contact").click(function() { // validate on submit
		$j(".input", "form#contact").each(function() { validateInput($j(this)); })
		if (!isFormValid())
			return false;
	});

}

function isFormValid() {

	return $j(".input.incorrect", "form#contact").length > 0 ? false : true;

}

function validateInput(obj) {

	var id = obj.attr("id");
	var correct = false;

	if (id == "email") { // email validator
		if (obj.val().match(/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,4}$/))
			correct = true;
	}
	else if (id == "message") { // message validator
		if (obj.val().replace(/(^\s+)|(\s+$)/g, "") != "")
			correct = true;
	}

	obj.removeClass("correct incorrect"); // clearing
	if (correct) {
		obj.addClass("correct");
	}
	else {
		obj.addClass("incorrect");
	}

}

//

function navigation() {
	$j("li a", "#nav").
		mousemove(function(e) {
			var relativeY = (e.pageY - this.offsetTop - 45) / 4;
			$j(this).css("backgroundPosition", "center " + relativeY + "px");
		}).
		mouseout(function(e) {
			$j(this).css("backgroundPosition", "center center");
		}).
		attr("title", ""); // remove title popup in WP
}

//

function lightBox() {
	$j("a[rel^='lightbox']").prettyPhoto({
		animationSpeed: 'fast', /* fast/slow/normal */
		padding: 40, /* padding for each side of the picture */
		opacity: 0.5, /* Value betwee 0 and 1 */
		showTitle: true, /* true/false */
		allowresize: true, /* true/false */
		counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
		theme: 'dark_rounded', /* light_rounded / dark_rounded / light_square / dark_square */
		callback: function() { }
	});
}

//

function folio(time, opacity) {
	$j("img", "#folio")
		.css("opacity", 1)
		.hover(
			function() {
				$j(this).stop().animate({ opacity: opacity }, time);
			},
			function() {
				$j(this).stop().animate({ opacity: 1 }, time);
			}
		);
}

//

function slides() {

	if (ie6) {
		return; // ie6 fails to animate overall opacity of the transparent PNGs
	}

	var $active = $j("#slides img.active");

	if ($active.length == 0) {
		$active = $j("#slides img:last");
	}

	var $next = $active.next().length ?
			$active.next() :
			$j("#slides img:first");

	$active.addClass("pre-active");

	$next.
		css({ opacity: 0 }).
		addClass("active").
		animate({ opacity: 1 }, 1000, function() {
			$active.
				removeClass("active pre-active").
				css({ opacity: 0 });
		});

}

//

function newsline() {
	var $ph = $j("#newsline a.ph");

	if ($ph.length == 0) { // prepare basement
		var $first = $j("#newsline a:first");
		$j("#newsline p").append("<br />").append($first.clone());
		$ph = $first.addClass("ph");
	}

	var $active = $j("#newsline a.active");

	if ($active.length == 0) {
		$active = $j("#newsline a:last");
	}

	var $next = $active.next().next().length ?
			$active.next().next() :
			$j("#newsline a:not(.ph):first");

	$next.addClass("active");
	$active.removeClass("active");

	if (ie6) { // bha! another ie6 opacity fail
		$ph.html($next.html());
		$ph.attr("href", $next.attr("href"));
	}
	else {
		$ph.animate({ opacity: 0 }, 500, function() { // hiding
			$ph.html($next.html());
			$ph.attr("href", $next.attr("href"));
			$ph.animate({ opacity: 1 }, 300); // revealing
		});
	}
}

//

var ie6 = jQuery.browser.msie && parseInt(jQuery.browser.version) < 7;
