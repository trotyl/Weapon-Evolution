describe('Game', function () {
	var game, player_1, player_2, console;

	beforeEach(function () {
		console = {log: null};
		spyOn(console, 'log');

		var weapon = new Weapon('优质木棒', 10);
		var shield = new Shield(5)

		player_1 = new Player('张三', 10, 8, '战士', weapon, shield);
		player_2 = new Player('李四', 30, 9, '普通人');

		game = new Game(console, player_1, player_2);
	});

	it('should begin with the right attritubes', function () {
		expect(game.players[0]).toEqual(player_1);
		expect(game.players[1]).toEqual(player_2);
		expect(game.turn).toEqual(true);
		expect(game.status).toEqual('run');
	});

	it('should get the right result', function () {
		game.play();
		expect(console.log).toHaveBeenCalledWith('战士张三用优质木棒攻击了普通人李四,李四受到了18点伤害,李四剩余生命：12');
		expect(console.log).toHaveBeenCalledWith('普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：6');
		expect(console.log).toHaveBeenCalledWith('李四被打败了.');
	});

});
