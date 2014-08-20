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

	it('should get hurt when be attacked', function () {
		player.hurt(40);
		expect(player.life).toEqual(60);
		player.hurt(20);
		expect(player.life).toEqual(40);
	});

	it('shoule be dead when have no life left', function () {
		player.hurt(100);
		expect(player.status).toEqual('dead');
	})
});
