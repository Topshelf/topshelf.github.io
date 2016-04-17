
var $j = jQuery.noConflict();

$j(function() {

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

	navigation(); // dynamic light selection in the menu (windows7-like)

});