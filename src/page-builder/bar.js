var Brentano = Brentano || {};

+function(){
	'use strict';

	var extend = Brentano.utils.extend;
	var Submenu = Brentano.Submenu;

	function Bar(id) {
  	this.id = id;
  	this._children = [];
  }
  extend(Submenu, Bar);

  Bar.prototype.build = function () {
  	return this._children[0].build();
  };

	Brentano.Bar = Bar;
}();