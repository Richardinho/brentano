var Brentano = Brentano || {};

+function() {

	'use strict';

	function mouseEnterTrigger(menu){
		if(!utils.searchAncestorElements(menu, '.is-active')) {
			common.closeActiveMenu();
		}
		common.activateMenu(menu);
	};

	function mouseLeaveMenu(event) {
		var menu = event.currentTarget;
		var timeoutId = setTimeout(function(){
			common.deactivateMenu(menu);
		},450);
		menu.setAttribute('data-timput-id', timeoutId);
	};

	function mouseEnterMenu(event) {
		var menu = event.currentTarget;
		var timeoutId = menu.getAttribute('data-timput-id');
		if(timeoutId) {
			clearTimeout(timeoutId);
		}
	};

	function bindMouseEventsToMenu (menu) {
		var triggers = utils.searchBetween(menu,'[data-trigger]','[data-menu]');
		triggers.forEach(utils.bindHandler('mouseenter', mouseEnterTrigger.bind(null, menu)));
		utils.addListener(menu, 'mouseleave', mouseLeaveMenu);
		utils.addListener(menu, 'mouseenter', mouseEnterMenu);
	};

	Brentano.attachMouseBindings = function () {
		var menus = common.getMenus();
		menus.forEach(bindMouseEventsToMenu);
	};

}();


//mousenav.run();