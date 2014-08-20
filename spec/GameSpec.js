describe('Game', function () {
	var game, player_1, player_2;

	beforeEach(function () {
		player_1 = new Player('张三', 100, 10);
		player_2 = new Player('李四', 200, 4);
		game = new Game(player_1, player_2);
	});

	it('should begin with the right attritubes', function () {
		expect(game.players[0]).toEqual(player_1);
		expect(game.players[1]).toEqual(player_2);
		expect(game.turn).toEqual(true);
		expect(game.status).toEqual('run');
	});

});
