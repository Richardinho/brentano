function init(config) {

	'use strict';

	function noop(){
		console.log('no op')
	}

	var callback = config.callback || noop;
	var menu = document.querySelector('#menu');

	initMenu(menu);

function initMenu(menu) {
	bindEventsToMenu(menu);
	getMenuItems(menu).forEach(function(item) {
		if(isMenu(item)) {

			initMenu(item);
		} else {
			// do something else, probably nothing.
		}
	});
}

function isMenu(item) {

	return item.hasAttribute('data-menu');
}

function handleTrigger(menu, event) {
	menu.classList.add('isActive');
}

function bindEventsToMenu(menu) {
	menu.addEventListener('mouseleave', mouseLeaveMenu, false);
	menu.querySelector('[data-menu-trigger]').addEventListener('mouseover', handleTrigger.bind(null, menu), false);
}

function mouseLeaveMenu(event) {
	event.target.classList.remove('isActive');
	toArray(event.target.querySelectorAll('.isActive')).forEach(function(item){ item.classList.remove('isActive')});
	callback();

}

function getMenuItems(menu) {
	return toArray(menu.querySelectorAll('[data-menu-items] li'));
}

function toArray(nodeList) {
	return Array.prototype.slice.apply(nodeList);
}

}
init({});