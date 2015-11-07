var TAB = 9;
var ENTER = 13;
var ESCAPE = 27;
var SPACE = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var HORIZONTAL = 'horizontal';

function isTrigger(target) {
	return target.matches('a');
}

function cycleBackwards() {
	console.log('cycle back')
}
function cycleForwards() {
	console.log('cycle for')
}

function getMenuIdFromTrigger(el) {

}

function navigateDownwards(el) {

}

function getMenuFromTrigger(el) {
	return utils.searchAncestorElements(el, '[data-menu]');
}

function navigateUpwards(el) {
	var menu = getMenuFromTrigger(el);
	var menuId = menu.id;
	var parentId = menu.getAttribute('data-parent');
	var parent = document.getElementById(parentId);
	parent.querySelector("[href='#" + menuId + "']").focus();
	common.deactivateMenu(menu);
}

function navigateTo(el) {
	var hash = common.getHashFromTrigger(el);
	if(hash) {
		common.activateMenu(document.querySelector(hash), true);
	}
}

function setOnKeyUpHandler(orientation) {
	return function onKeyUp(event) {
		var el = event.target;
		if(isTrigger(el)) {
			switch(event.which) {
				case SPACE :
					navigateTo(el)
					break;
				case ESCAPE:
					navigateUpwards(el);
					break;
				case ENTER :
					navigateTo(el)
					break;
				case LEFT_ARROW :
					if(orientation == HORIZONTAL) {
						cycleBack(el);
					} else {
						navigateUpwards(el);
					}
					break;
				case RIGHT_ARROW :
					if(orientation == HORIZONTAL) {
						cycleForwards(el);
					} else {}
					break;
				case DOWN_ARROW :
					if(orientation == HORIZONTAL) {
						navigateDownwards(el);
					} else {
						cycleForwards(el);
					}
					break;
				case UP_ARROW :
					if(orientation == HORIZONTAL) {
						navigateUpwards(el);
					} else {
						cycleBack(el);
					}
					break;
				default :
				// something else
			}
		}
	}
}

function getMenuOrientation(menu) {
	return menu.getAttribute('data-orientation') || HORIZONTAL;
}

function bindKeyEventsToMenu(menu) {
	utils.addListener(menu, 'keyup', setOnKeyUpHandler(getMenuOrientation(menu)));
	utils.addListener(menu, 'keydown', disableEvent());
}

function disableEvent(whitelist) {
	var whitelist = whitelist || [];
	return function(event) {
		if(whitelist.indexOf(event.which) == -1) {
			utils.preventDefault(event);
			utils.stopPropagation(event);
		}
	};
}

function init(menu){
	if(!(menu.getAttribute('data-menu') === 'level1')) {
		menu.style.display = 'none';
	}
	bindKeyEventsToMenu(menu)
}



function run() {
	var menus = common.getMenus();
	menus.forEach(init);
}

function cycleForwards(trigger) {
	var li = utils.searchAncestorElements(trigger, 'li');
	var nextElement = utils.getNextElementSibling(li);
	if(nextElement) {
		nextElement.querySelector('a').focus();
	} else {
		utils.getFirstElementChild(li.parentNode).querySelector('a').focus();
	}
}

function cycleBack(trigger) {
	var li = utils.searchAncestorElements(trigger, 'li');
	var previousElement = utils.getPreviousElementSibling(li);
	if(previousElement) {
		previousElement.querySelector('a').focus();
	} else {
		utils.getLastElementChild(li.parentNode).querySelector('a').focus();
	}
}

run();