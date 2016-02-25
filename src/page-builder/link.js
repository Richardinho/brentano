var Brentano = Brentano || {};

+function(){
	'use strict';

	var extend = Brentano.utils.extend;
	var Item = Brentano.Item;

	function Link(href, text) {
		this.href = href;
		this.text = text;
	}

	extend(Item, Link);

	Link.prototype.build = function () {
		var link = document.createElement('a');
		link.setAttribute('tabindex', 0);
		link.setAttribute('href', this.href);
		var text = document.createTextNode(this.text);
		link.appendChild(text);
		return link;

	};

	Brentano.Link = Link;
}();