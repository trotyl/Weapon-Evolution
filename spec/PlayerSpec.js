describe('Player', function () {
	var player;

	beforeEach(function () {
		player = new Player('张三', 100, 10);
	});

	it('should begin with the right attritubes', function () {
		expect(player.name).toEqual('张三');
		expect(player.life).toEqual(100);
		expect(player.attack).toEqual(10);
	});
});
