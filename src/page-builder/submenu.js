var Brentano = Brentano || {};

+function(){
	'use strict';

	var extend = Brentano.utils.extend;
	var MenuElement = Brentano.MenuElement;
	var Items = Brentano.Items;

	function Submenu(name, classList, orientation) {
		this.name = name;
		this._children = [];
		this._classList = classList || [];
		this._orientation = orientation || 'horizontal';
	}

	extend(MenuElement, Submenu);

	Submenu.prototype.items = function (id, cl, orientation) {

		var items = new Brentano.Items(id, cl, orientation);
		this._children[0] = items;
		items._parentContext = this;
		return items;
	};



	Submenu.prototype.build = function(){
		var menu = document.createElement('div');
		menu.setAttribute('data-menu','');
		DOMTokenList.prototype.add.apply(menu.classList, this._classList);

		var trigger = document.createElement('span');
		trigger.appendChild(document.createTextNode(this.name));
		trigger.setAttribute('data-trigger','');
		trigger.setAttribute('tabindex', 0);
		menu.appendChild(trigger);
		menu.appendChild(Submenu._Parent.prototype.build.apply(this));
		return menu;

	};

	Brentano.Submenu = Submenu;
}();