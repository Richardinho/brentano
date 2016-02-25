var Brentano = Brentano || {};

+function(){
	'use strict';

	var extend = Brentano.utils.extend;
	var MenuElement = Brentano.MenuElement;

	function Item(id) {
		this.id = id;
	}
	extend(MenuElement, Item);

	Item.prototype.build = function(){
		var li = document.createElement('li');
		li.innerHTML = 'foo';
		return li;
	};

	Brentano.Item = Item;
}();