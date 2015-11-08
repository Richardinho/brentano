var common = {};

common.getMenus = function () {
	return utils.toArray(document.querySelectorAll('[data-menu]'));
};

common.getFocusables = function() {
	return utils.toArray(document.querySelectorAll('[tabindex]'));
};

common.activateMenu = function(menu) {
	menu.classList.add('is-active');
};

common.deactivateMenu = function (menu) {
	menu.classList.remove('is-active');
};

common.getOrientation = function (trigger) {
	var parentItems = utils.searchAncestorElements(trigger, '[data-menu-items]');
	return (parentItems && parentItems.getAttribute('data-orientation')) || 'horizontal';
};

common.isRoot = function (menu) {
	return menu.hasAttribute('data-menu') && (menu.getAttribute('data-menu') == 'root');
};

common.putFocusInFirstField = function (menu){
	var items = menu.querySelector('[data-menu-items]');
	var firstItem = utils.getFirstElementChild(items);
	firstItem.querySelector('[tabindex]').focus();
};
