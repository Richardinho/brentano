describe('utils.js', function () {
	var containerEl;

	beforeEach(function () {
		containerEl = document.body.appendChild(document.createElement('div'));

	});
	afterEach(function () {
		document.body.removeChild(containerEl);
	});

	describe('toUpperCase()', function () {
		it('should transform input string to all uppercase', function () {
			expect(utils.toUpperCase('hello')).toBe('HELLO');
		});
	});

	describe('toLowerCase()', function () {
		it('should transform input string to all lowercase', function () {
			expect(utils.toLowerCase('HELLO')).toBe('hello');
		});
	});

	describe('searchAncestorElements', function () {
		var container;
		var frag = [
			'<div>',
				'<div id="foo">',
					'<div>',
						'<div id="bar">bar</div>',
					'</div>',
				'</div>',
			'</div>'
		].join('');
		beforeEach(function () {
			containerEl.innerHTML = frag;
		});
		it('should find ancestor element matching selector', function () {
			var bar = document.querySelector('#bar');
			var foo = utils.searchAncestorElements(bar, '#foo');
			expect(foo.id).toBe('foo');
		});
	});

});