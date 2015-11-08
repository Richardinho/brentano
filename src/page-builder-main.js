var mousenav = {};

mousenav.mouseEnterTrigger = function(menu, event){
	menu.classList.add('is-active');
};

mousenav.mouseLeaveMenu = function(event) {
	var menu = event.currentTarget;
	var timeoutId = setTimeout(function(){
		menu.classList.remove('is-active');
	},450);
	menu.setAttribute('data-timput-id', timeoutId);
}

mousenav.mouseEnterMenu = function(event) {
	var menu = event.currentTarget;
	var timeoutId = menu.getAttribute('data-timput-id');
	timeoutId && clearTimeout(timeoutId);
}

mousenav.bindMouseEventsToMenu = function (menu) {
	var triggers = utils.searchBetween(menu,'[data-trigger]','[data-menu]');
	triggers.forEach(utils.bindHandler('mouseenter', mousenav.mouseEnterTrigger.bind(null, menu)));
	utils.addListener(menu, 'mouseleave', mousenav.mouseLeaveMenu);
	utils.addListener(menu, 'mouseenter', mousenav.mouseEnterMenu);
};

mousenav.init = function (menu) {
	mousenav.bindMouseEventsToMenu(menu)
};

mousenav.run = function () {
	var menus = common.getMenus();
	menus.forEach(mousenav.init);
};

mousenav.run()