var common = {};

common.getMenus = function () {
	return utils.toArray(document.querySelectorAll('[data-menu]'));
}

common.getTriggers = function(menu) {
	return utils.toArray(menu.querySelectorAll('[data-trigger]'));
}

common.activateMenu = function(menu, focus) {
	if(menu && menu.hasAttribute('data-menu')) {
		menu.style.display = 'inline-block'
		setTimeout(function(){
			menu.classList.add('is-active');
			var trigger = common.getTriggers(menu)[0];
			trigger && focus && trigger.focus();
		},0);
	}
}

common.getRootMenu = function () {
	return document.querySelector('[data-menu=level1]');
};

common.isRoot = function (menu, rootname) {
	return menu.hasAttribute('data-menu') && (menu.getAttribute('data-menu') == (rootname || 'level1'));
};

common.deactivateMenu = function (menu) {
	if(!common.isRoot(menu)) {
		menu.classList.remove('is-active');
		menu.style.display = 'none';
	}
};

common.isOpen = function (menu) {
	return menu.classList.contains('is-active');
}

common.isClosed = function(menu) {
	return !common.isOpen(menu);
}

common.getHashFromTrigger = function (trigger) {
	var url = (utils.toUpperCase(trigger.nodeName) == 'A' && new URL(trigger.href)) || {};
	return url.hash || false;
}