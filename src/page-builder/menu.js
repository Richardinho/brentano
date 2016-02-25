var Brentano = Brentano || {};

+function(){
	'use strict';

	var extend = Brentano.utils.extend;
	var MenuElement = Brentano.MenuElement;
	var Bar = Brentano.Bar;

	function Menu(id) {
		this.id = id;
		this._children = [];
	}

	extend(MenuElement, Menu);

	Menu.prototype.bar = function(id) {
		var bar = new Bar(id);
		this._children[0] = bar;
		bar._parentContext = this;
		return bar;
	};

	Menu.prototype.build = function () {
		var menuRoot = createMenuRoot();
		menuRoot.appendChild(Menu._Parent.prototype.build.apply(this));
		menuRoot.setAttribute('tabindex', 0);
		return menuRoot;
	};

	function createMenuRoot() {
		var element = document.createElement('div');
		element.setAttribute('tabindex', 0); // make focusable and within the natural page tabbing order
		element.setAttribute('data-menu', 'root');
		return element;
	}

	Brentano.Menu = Menu;
}();