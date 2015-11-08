var TAB = 9;
var ENTER = 13;
var ESCAPE = 27;
var SPACE = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var HORIZONTAL = 'horizontal';

function getTargetMenu(trigger){
	return utils.searchAncestorElements(trigger, '[data-menu]');
}

function navigateUpwards(el) {
	var di = utils.searchAncestorElements(el, '[data-menu-items]');
	var menu = utils.searchAncestorElements(di, '[data-menu]');
	common.deactivateMenu(menu);
	menu.querySelector('[data-trigger]').focus();
}


function navigateTo(trigger) {
	var menu = getTargetMenu(trigger);
	menu && common.activateMenu(menu);
	common.putFocusInFirstField(menu);

}

function cycleBack(trigger) {
	var li = utils.searchAncestorElements(trigger, 'li');
	var previousElement = utils.getPreviousElementSibling(li);
	if(previousElement) {
		previousElement.querySelector('[tabindex]').focus();
	} else {
		utils.getLastElementChild(li.parentNode).querySelector('[tabindex]').focus();
	}
}

function cycleForwards(trigger) {
	var li = utils.searchAncestorElements(trigger, 'li');
	var nextElement = utils.getNextElementSibling(li);
	if(nextElement) {
		nextElement.querySelector('[tabindex]').focus();
	} else {
		utils.getFirstElementChild(li.parentNode).querySelector('[tabindex]').focus();
	}
}

function setOnKeyUpHandler(event) {
	var el = event.currentTarget;
	event.stopPropagation();
	var orientation = common.getOrientation(el);

	if(common.isRoot(el)) {
		console.log('is root')
		common.putFocusInFirstField(el);
	}

	switch(event.which) {
		case SPACE :
			navigateTo(el)
			break;
		case ESCAPE:
			navigateUpwards(el);
			break;
		case ENTER :
			console.log('enter')
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
			} else {
				navigateTo(el);
			}
			break;
		case DOWN_ARROW :
			if(orientation == HORIZONTAL) {
				navigateTo(el);
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

function bindKeyEventsToFocusable(focusable) {
	utils.addListener(focusable, 'keyup', setOnKeyUpHandler);
	//utils.addListener(trigger, 'keydown', disableEvent());
}

function init(focusable){
	bindKeyEventsToFocusable(focusable)
}

function run() {
	var focusables = common.getFocusables();
	focusables.forEach(init);
}

run();