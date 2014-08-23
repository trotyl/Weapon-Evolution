describe('Player', function () {
	var player, attacker;

	beforeEach(function () {
		player = new Player('张三', 100, 10, '普通人');
		attacker = new Player('李四', 50, 20, '普通人');
	});

	it('should begin with the right attritubes', function () {
		expect(player.name).toEqual('张三');
		expect(player.life).toEqual(100);
		expect(player.attack).toEqual(10);
	});

	it('should get hurt when be attacked', function () {
		player.getHurt(attacker);
		expect(player.life).toEqual(80);
		player.getHurt(attacker);
		expect(player.life).toEqual(60);
	});

	it('shoule be dead when have no life left', function () {
		player.getHurt(attacker);
		player.getHurt(attacker);
		player.getHurt(attacker);
		player.getHurt(attacker);
		player.getHurt(attacker);
		expect(player.status).toEqual('dead');
	});

});
