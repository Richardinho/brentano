var Brentano = Brentano || {};

+function(){

	var passThrough = Brentano.utils.passThrough;

	function MenuElement() {}

	MenuElement.prototype.build = function (interceptor) {
		var handler = interceptor || passThrough;
		var frag = document.createDocumentFragment();
		if(this._children && (this._children instanceof Array)) {
			this._children.forEach(function (child) {
				if(child instanceof MenuElement) {
					frag.appendChild(handler(child.build()));
				}
			});
		}
		return frag;
	};

	MenuElement.prototype.resetContext = function () {
		if(this._parentContext) {
			return this._parentContext;
		} else {
			throw {
				name : 'no parent context'
			};
		}
	};

	MenuElement.prototype.resetContextTwice = function () {
		return this.resetContext().resetContext();
	};

	Brentano.MenuElement = MenuElement;

}();
