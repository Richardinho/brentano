describe('main tests', function () {

	describe('isMenu()', function () {
		var menuElement;
		describe('when element is a menu', function () {
			beforeEach(function () {
				menuElement = document.createElement('div');
				menuElement.setAttribute('data-menu','');
			});
			it('should return TRUE', function () {
				expect(isMenu(menuElement)).toBe(true);
			});
		});
		describe('when element is NOT a menu', function () {
			beforeEach(function () {
				menuElement = document.createElement('div');
			});
			it('should return FALSE', function () {
				expect(isMenu(menuElement)).toBe(false);
			});
		});
	});
	describe('getMenuItems()', function () {
		var menuEl;
		beforeEach(function () {
			menuEl = document.body.appendChild(document.createElement('div'));
			var menuHTML = [
				'<ul data-menu-items>',
						'<li data-menu>',
								'<span data-menu-trigger>one</span>',
								'<ul data-menu-items >',
										'<li><a href=\'#apple\'>apple</a></li>',
										'<li><a href=\'#carrot\'>carrot</a></li>',
								'</ul>',
						'</li>',
						'<li>',
								'<a href=\'#lettuce\'>lettuce</a>',
						'</li>',
				'</ul>'].join('');
				menuEl.innerHTML = menuHTML;
		});
		afterEach(function(){
			document.body.removeChild(menuEl);
		});
		it('should return only first generation menu items', function () {
			var items = getMenuItems(menuEl);
			expect(items.length).toBe(2);
		});
	});
});