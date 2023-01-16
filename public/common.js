// Show an element
var show = function (elem) {
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem) {
	elem.style.display = 'none';
};

// Toggle element visibility
var toggle = function (selector) {
  const elem = document.querySelector(selector);
	// If the element is visible , hide it
	console.log(window.getComputedStyle(elem).display);
	var style = window.getComputedStyle(elem).display
	if (style === 'block' || style === 'inline-block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);
};