var structure;

function createMenuRoot() {

	var element = document.createElement('div');
	element.setAttribute('tabindex', 0); // make focusable and within the natural page tabbing order
	element.setAttribute('data-menu', 'root');
	return element;

}

function createListItemEl(listItem) {
	var listItemEl = document.createElement('li');
	listItemEl.innerHTML = listItem;
	return listItemEl;
}

function createMenuList(listItems){
	var list = document.createElement('ul');
	var frag = document.createDocumentFragment();
	var listItemEls = listItems.map(createListItemEl).reduce(function(fragment, element){
		fragment.appendChild(element);
		return fragment;
	}, frag);
	list.appendChild(listItemEls);
	return list;
}


//

function extend(Parent, Child) {
	var F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child._Parent = Parent;
};

function passThrough(arg) { return arg; }
////////////////////////////

function MenuElement() {}

MenuElement.prototype.build = function (interceptor) {
	var handler = interceptor || passThrough;
	var frag = document.createDocumentFragment();
	if(this._children && (this._children instanceof Array)) {
		this._children.forEach(function (child) {
			if(child instanceof MenuElement) {
				frag.appendChild(handler(child.build()));
			}
		});
	}
	return frag;
}

MenuElement.prototype.resetContext = function () {
	if(this._parentContext) {
		return this._parentContext;
	} else {
		throw {
			name : 'no parent context'
		};
	}
};

MenuElement.prototype.resetContextTwice = function () {
	return this.resetContext().resetContext();
};

////////////////////

function Item(id) {
	this.id = id;
}
extend(MenuElement, Item);

Item.prototype.build = function(){

	var li = document.createElement('li');
	li.innerHTML = 'foo';
	return li;
};

///////////////////////

function Submenu(name, classList) {
	this.name = name;
	this._children = [];
	this._classList = classList || [];
}

extend(MenuElement, Submenu);

Submenu.prototype.items = function (id, cl) {

	var items = new Items(id, cl);
	this._children[0] = items;
	items._parentContext = this;
	return items;
}

function wrapElement(wrapperType) {
	return function (el) {
		var wrapper = document.createElement(wrapperType);
  	wrapper.appendChild(el);
  	return wrapper;
	}
}

Submenu.prototype.build = function(){
	var menu = document.createElement('div');
	menu.setAttribute('data-menu','');
	DOMTokenList.prototype.add.apply(menu.classList, this._classList);

	var trigger = document.createElement('span');
	trigger.appendChild(document.createTextNode(this.name));
	trigger.setAttribute('data-trigger','');
	menu.appendChild(trigger);
	menu.appendChild(Submenu._Parent.prototype.build.apply(this));
	return menu;

};

/////////////////
function Link(href, text) {
	this.href = href;
	this.text = text;
}

extend(Item, Link);

Link.prototype.build = function () {
	var link = document.createElement('a');
	link.setAttribute('data-link','');
	link.setAttribute('href', this.href);
	var text = document.createTextNode(this.text);
	link.appendChild(text);
	return link;

};


//////
//



function Items(id, cl) {
	this.id = id;
	this._children = [];
	this._classes = (cl || []);

}
extend(MenuElement, Items);

Items.prototype.submenu = function (name, classList) {
	var submenu = new Submenu(name, classList);
	this._children.push(submenu);
	submenu._parentContext = this;
	return submenu;
};

Items.prototype.link = function (href,text) {
	this._children.push(new Link(href,text));
	return this;
};

Items.prototype.build = function(){
	var list = document.createElement('ul');
	list.setAttribute('data-menu-items','');
	DOMTokenList.prototype.add.apply(list.classList, this._classes);

	list.appendChild(Items._Parent.prototype.build.call(this, wrapElement('li')));
	return list;
};

///////
function Bar(id) {
	this.id = id;
	this._children = [];
}
extend(Submenu, Bar);

Bar.prototype.build = function () {
	return this._children[0].build();
};


//////

function Menu(id) {
	this.id = id;
	this._children = [];
}
extend(MenuElement, Menu);

Menu.prototype.bar = function(id) {
	var bar = new Bar(id);
	this._children[0] = bar;
	bar._parentContext = this;
	return bar;
}

Menu.prototype.build = function () {
	var menuRoot = createMenuRoot();
	menuRoot.appendChild(Menu._Parent.prototype.build.apply(this));
	return menuRoot;
};

//////

function menu(id) {
	return new Menu(id);
}



var container = document.getElementById('container');

var men = menu('foo')
						.bar('my bar') // bar is a special sort of submenu
							.items('bar items',['menu-bar-items'])  // is a list of items
								.submenu('fruit', ['sub-menu'])  //  submenu is a type of item
									.items('fruit items', ['sub-menu-items'])
										.link('#booya', 'booya')
										.link('/generic-page.html', 'generic')
								.resetContextTwice()
								.submenu('art', ['sub-menu'])
									.items('', ['sub-menu-items'])
										.link('/generic-page.html', 'painting')
										.link('/generic-page.html', 'sculpture')
										.link('/generic-page.html', 'architecture')
										.link('/generic-page.html', 'stained glass')
										.link('/generic-page.html', 'illustration')
								.resetContextTwice()
								.submenu('sport', ['sub-menu'])
									.items('', ['sub-menu-items'])
										.link('/generic-page.html', 'football')
										.link('/generic-page.html', 'rugby')
										.link('/generic-page.html', 'tennis')
								.resetContextTwice()
						.resetContextTwice()

container.appendChild(men.build());



