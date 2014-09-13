describe('In level 2 ', function () {
    var console, game, player_1, player_2;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        player_1 = new Player('张三', 10, 8);
        player_2 = new Player('李四', 20, 9);
        game = new Game(console, player_1, player_2);
    });

    it('should output the result right', function() {
        game.play();
        expect(console.log).toHaveBeenCalledWith('李四被打败了.');
    });
});