  var TAB = 9;
  var ENTER = 13;
  var ESCAPE = 27;
  var SPACE = 32;
  var LEFT_ARROW = 37;
  var UP_ARROW = 38;
  var RIGHT_ARROW = 39;
  var DOWN_ARROW = 40;

  var whitelist = [13];
  var root;

	var callback =  noop;

	function initMenu(menu) {
		if(isRootMenu(menu)) {
			root = menu;
			menu.addEventListener('keyup', function (event) {
				if(event.which === DOWN_ARROW || event.which === RIGHT_ARROW) {
					menu.querySelector('[tabindex]').focus();
				}

			}, false);

		}
		bindEventsToMenu(menu);
		getMenuItems(menu).forEach(function(item) {
			if(isMenu(item)) {
				initMenu(item);
			}
		});
	}

	function closeMenu(menu) {
		menu.classList.remove('isOpen');
	}

	//  starts at root of a tree and closes all nested menus within it
	//  including itself
	function closeAllMenus(rootMenu) {
		toArray(rootMenu.children).forEach(function(child) {
			closeAllMenus(child);
		});
		closeMenu(rootMenu);
	}

	//  if the mouse hovers on the trigger
	//  or click event on trigger
	//  or tab onto trigger etc...
	function open(menu) {
		menu.classList.add('isOpen');
	}

	function handleMouseLeave(event) {
		var menu = event.currentTarget;
		closeAllMenus(menu);
	}

	function handleMouseOverTrigger(menu) {
		open(menu);
	}

	function handleEscape(menu, event) {
		closeParentMenu(menu, event.currentTarget);
	}

	function closeParentMenu(menu, focusable) {
		var parentMenu = searchAncestorElements(focusable.parentNode, '[data-menu]');
		if(parentMenu ){
			parentMenu.querySelector('[tabindex]').focus();
			closeAllMenus(parentMenu);
		}
	}

	function cycleForwardsThroughMenuItems(focusable) {
		var li = searchAncestorElements(focusable, 'li');
		var nextElement = li.nextElementSibling;
		if(nextElement) {
			nextElement.querySelector('[tabindex]').focus();
		} else {
			li.parentNode.firstElementChild.querySelector('[tabindex]').focus();
		}
	}

	function cycleBackwardsThroughMenuItems(focusable) {
		var li = searchAncestorElements(focusable, 'li');
		var previousElement = li.previousElementSibling;
		if(previousElement) {
			previousElement.querySelector('[tabindex]').focus();
		} else {
			li.parentNode.lastElementChild.querySelector('[tabindex]').focus();
		}
	}

	function handleDownArrowOnFocusable(orientation) {
		if(orientation === 'horizontal') {
			return function(focusable, menu) {
				if(focusable.hasAttribute('data-menu-trigger')){
					openSubmenu(menu);
				}
			};
		} else {
				return cycleForwardsThroughMenuItems;
		}
	}

	function handleUpArrowOnFocusable(orientation) {
		if(orientation === 'horizontal') {
			return function(focusable, menu) {
				closeParentMenu(menu, focusable);
			};
		} else {
			return cycleBackwardsThroughMenuItems;
		}
	}

	function handleLeftArrowOnFocusable(orientation) {
		if(orientation === 'horizontal') {
			return cycleBackwardsThroughMenuItems;
		} else {
			return function(focusable, menu) {
				closeParentMenu(menu, focusable);
			};
		}
	}

	function handleRightArrowOnFocusable(orientation) {
		if(orientation === 'horizontal') {
			return cycleForwardsThroughMenuItems;
		} else {
			return function(focusable, menu) {
				if(focusable.hasAttribute('data-menu-trigger')){
					openSubmenu(menu);
				}
			};
		}
	}

	function handleSpace(menu, event) {
		if(event.currentTarget.hasAttribute('data-menu-trigger')){
			openSubmenu(menu);
		}
	}

	function handleEnter(menu, event) {
		if(event.currentTarget.nodeName !== 'A'){
			event.preventDefault();
			if(event.currentTarget.hasAttribute('data-menu-trigger')){
				openSubmenu(menu);
			}
		}
	}

	function openSubmenu(menu) {
		open(menu);
		placeFocusOnFirstMenuItem(menu);
	}


	function placeFocusOnFirstMenuItem(menu) {
		menu.querySelector('[data-menu-items]').querySelector('[tabindex]').focus();
	}

	function handleKeyUpOnTrigger(menu, event) {
		switch(event.which) {
		case TAB :
			root.focus();
			closeAllMenus(root);
			break;
		case ENTER :
			handleEnter(menu, event);
			break;
		case SPACE :
			handleSpace(menu, event);
			break;
		case ESCAPE :
			handleEscape(menu, event);
			break;
		case LEFT_ARROW :
			handleLeftArrowOnFocusable(getMenuOrientation())(event.currentTarget, menu);
			break;
		case UP_ARROW :
			handleUpArrowOnFocusable(getMenuOrientation())(event.currentTarget, menu);
			break;
		case RIGHT_ARROW :
			handleRightArrowOnFocusable(getMenuOrientation())(event.currentTarget, menu);
			break;
		case DOWN_ARROW :
			handleDownArrowOnFocusable(getMenuOrientation())(event.currentTarget, menu);
			break;
		default :
			// do nowt.
		}
		event.stopPropagation();
	}

	function getMenuOrientation() {
		return 'vertical';
	}

	function bindEventsToMenu(menu) {

		menu.addEventListener('mouseleave', handleMouseLeave, false);
		var trigger = menu.querySelector('[data-menu-trigger]');

		// check that this is the trigger for this menu
		if(!!trigger && isDirectChild(menu, trigger)) {
			trigger.addEventListener('mouseover', handleMouseOverTrigger.bind(null, menu), false);
			trigger.addEventListener('keyup', handleKeyUpOnTrigger.bind(null, menu), false);
			trigger.addEventListener('keydown', swallowEvents(whitelist), false);
		}

		var focusables = getFocusablesForMenu(menu);

		focusables.forEach(function (focusable) {
			focusable.addEventListener('keyup', handleKeyUpOnTrigger.bind(null, menu), false);
			focusable.addEventListener('keydown', swallowEvents(whitelist), false);
		});
	}

	function swallowEvents(whitelist) {
		return function(event) {
			if(whitelist.indexOf(event.which) == -1) {
				event.preventDefault();
				event.stopPropagation();
			}
		};
	}

	function getFocusablesForMenu(menu) {
		var menuItemsContainer = menu.querySelector('[data-menu-items]');
		//  important to filter out menus
		var menuItems = toArray(menuItemsContainer.children).filter(isNotMenu);
		var map =menuItems.map(function (item) {
			return item.querySelector('[tabindex]');
		}).filter(isNotNull);
		return map;
	}

	//  utility methods
	function isNotNull(obj) {
		return obj !== null;
	}

	function isRootMenu(menu) {
		return menu.hasAttribute('data-menu-root');
	}
	function searchAncestorElements(descendent, selector){
		var parent = descendent.parentNode;
		if(parent === null || isRootMenu(parent)) { return false; }
		if(parent.matches(selector)) {
			return parent;
		} else {
			return searchAncestorElements(parent, selector);
		}
	}

	function isDirectChild(parent, child) {
		var trueChildren = toArray(parent.children);
		return trueChildren.indexOf(child) != -1;
	}

	function getMenuItems(menu) {
		return toArray(menu.querySelector('[data-menu-items]').children);
	}

	function toArray(nodeList) {
		return Array.prototype.slice.apply(nodeList);
	}

	function isMenu(menuItem){
		return menuItem.hasAttribute('data-menu');
	}

	function isNotMenu(menuItem) {
		return !isMenu(menuItem);
	}

	function noop(){}

