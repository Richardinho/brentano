function init(config) {

	'use strict';

	function noop(){}

	var callback = config.callback || noop;
	var menu = document.querySelector('#menu');

	initMenu(menu);

	function initMenu(menu) {
		bindEventsToMenu(menu);
		getMenuItems(menu).forEach(function(item) {
			if(isMenu(item)) {
				initMenu(item);
			}
		});
	}

	function isMenu(item) {
		return item.hasAttribute('data-menu');
	}

	function handleTrigger(menu, event) {
		menu.classList.toggle('isActive');
	}

	function bindEventsToMenu(menu) {
		menu.querySelector('[data-menu-trigger]').addEventListener('click', handleTrigger.bind(null, menu), false);
	}

	function mouseLeaveMenu(event) {
		event.target.classList.remove('isActive');
		toArray(event.target.querySelectorAll('.isActive')).forEach(function(item){ item.classList.remove('isActive')});
		callback();

	}

	function getMenuItems(menu) {
		return toArray(menu.querySelector('[data-menu-items]').children);
	}

	function toArray(nodeList) {
		return Array.prototype.slice.apply(nodeList);
	}
}
init({});