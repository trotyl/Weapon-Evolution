describe('In level 1 ', function () {
    var console, game, player_1, player_2;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        player_1 = new Player('张三', 100000, 10000);
        player_2 = new Player('李四', 1, 1);
        game = new Game(console, player_1, player_2);
    });

    it('player should have life property', function () {
        expect(player_1.life).toBeTruthy();
        expect(player_2.life).toBeTruthy();
    });

    it('player should have attack property', function () {
        expect(player_1.attack).toBeTruthy();
        expect(player_2.attack).toBeTruthy();
    });

    it('player should not have defence property', function () {
        expect(player_1.defence).toBeFalsy();
        expect(player_2.defence).toBeFalsy();
    });

    it('player should have name property', function () {
        expect(player_1.name).toBeTruthy();
        expect(player_2.name).toBeTruthy();
    });

    it('game should output the result right', function() {
        game.play();
        expect(console.log).toHaveBeenCalledWith('李四被打败了.');
    });
});