var Brentano = Brentano || {};

+function() {

	'use strict';

	function extend(Parent, Child) {
		var F = function () {};
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child._Parent = Parent;
		Child.prototype.constructor = Child;
	}

	function passThrough(arg) {
		return arg;
	}

	function wrapElement(wrapperType) {
		return function (el) {
			var wrapper = document.createElement(wrapperType);
			wrapper.appendChild(el);
			return wrapper;
		};
	}

	Brentano.utils = {
		extend : extend,
		passThrough : passThrough,
		wrapElement : wrapElement
	};

}();
