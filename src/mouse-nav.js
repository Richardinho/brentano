var mousenav = mousenav || {};

mousenav.currentMenu = false;

mousenav.closeChildMenus = function (menu) {
	var children = common.getTriggers(menu);
	children.forEach(function(child) {
		var hash = common.getHashFromTrigger(child);
		if(hash) {
			var childMenu = document.querySelector(hash);
			if(childMenu) {
				common.deactivateMenu(childMenu);
				mousenav.closeChildMenus(childMenu)
			}
		}
	});
};

mousenav.closeAllMenus = function () {
	mousenav.closeChildMenus(common.getRootMenu());
};

/*
 *  when mouse hovers over trigger, open up child menu if it's not
 *  already open.
 *
 *  if it's currently open, close all menus apart from it's immediate child
 *
 *  if this trigger does not have a hash href, close all child menus
 */
mousenav.mouseEnterTrigger = function(menu, event) {
	var hash = common.getHashFromTrigger(event.target);
	if(hash) {
		var childMenu = document.querySelector(hash);
		if(childMenu) {
			if(common.isOpen(childMenu)) {
				mousenav.closeChildMenus(childMenu);
			} else {
				mousenav.closeChildMenus(menu);
				common.activateMenu(childMenu, false);
			}
		}
	} else {
		//  close all child menus of this menu
		mousenav.closeChildMenus(menu);
	}
}

/*
 *  close all menus if mouse isn't over any menus
 */
mousenav.mouseLeaveMenu = function (event) {
	mousenav.currentMenu = false;
	setTimeout(function() {
		if(!mousenav.currentMenu ) {
			mousenav.closeAllMenus();
		}
	}, 1000);
}

mousenav.mouseEnterMenu = function (event) {
	mousenav.currentMenu = true;
};

mousenav.bindMouseEventsToMenu = function (menu) {
	var triggers = common.getTriggers(menu);
	triggers.forEach(utils.bindHandler('mouseenter', mousenav.mouseEnterTrigger.bind(null, menu)));
	utils.addListener(menu, 'mouseleave', mousenav.mouseLeaveMenu);
	utils.addListener(menu, 'mouseenter', mousenav.mouseEnterMenu);
};

mousenav.init = function (menu) {
	if(!common.isRoot(menu)) {
		menu.style.display = 'none';
	}
	mousenav.bindMouseEventsToMenu(menu)
};

mousenav.run = function () {
	var menus = common.getMenus();
	menus.forEach(mousenav.init);
};

mousenav.run()