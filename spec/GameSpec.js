describe('Game', function () {
	var game, player_1, player_2, console;

	beforeEach(function () {
		console = {log: null};
		spyOn(console, 'log');

		player_1 = new Player('张三', 10, 8);
		player_2 = new Player('李四', 20, 9);

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
		expect(console.log).toHaveBeenCalledWith('张三攻击了李四,李四受到了8点伤害,李四剩余生命：12');
		expect(console.log).toHaveBeenCalledWith('李四攻击了张三,张三受到了9点伤害,张三剩余生命：1');
		expect(console.log).toHaveBeenCalledWith('张三攻击了李四,李四受到了8点伤害,李四剩余生命：4');
		expect(console.log).toHaveBeenCalledWith('李四攻击了张三,张三受到了9点伤害,张三剩余生命：-8');
		expect(console.log).toHaveBeenCalledWith('张三被打败了.');
	});

});
