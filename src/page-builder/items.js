var Brentano = Brentano || {};

+function(){

	'use strict';

	var extend = Brentano.utils.extend;
	var wrapElement = Brentano.utils.wrapElement;
	var MenuElement = Brentano.MenuElement;
	var Submenu = Brentano.Submenu;
	var Link = Brentano.Link;

	function Items(id, cl, orientation) {
		this.id = id;
		this._children = [];
		this._classes = (cl || []);
		this._orientation = orientation;
	}
	extend(MenuElement, Items);

	Items.prototype.submenu = function (name, classList) {
		var submenu = new Brentano.Submenu(name, classList);
		this._children.push(submenu);
		submenu._parentContext = this;
		return submenu;
	};

	Items.prototype.link = function (href,text) {
		this._children.push(new Link(href,text));
		return this;
	};

	Items.prototype.build = function(){
		var list = document.createElement('ul');
		list.setAttribute('data-menu-items','');
		list.setAttribute('data-orientation', this._orientation);
		DOMTokenList.prototype.add.apply(list.classList, this._classes);
		list.appendChild(Items._Parent.prototype.build.call(this, wrapElement('li')));
		return list;
	};

	Brentano.Items = Items;

}();