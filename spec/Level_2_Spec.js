describe('In level 2 ', function () {
    var console, game, player_1, player_2;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        player_1 = new Player('张三', 10, 8);
        player_2 = new Player('李四', 20, 9);
        game = new Game(console, player_1, player_2);
    });

    it('game should output the result procedure', function() {
        game.play();
        expect(console.log).toHaveBeenCalledWith('张三攻击了李四, 李四受到了8点伤害, 李四剩余生命：12');
        expect(console.log).toHaveBeenCalledWith('李四攻击了张三, 张三受到了9点伤害, 张三剩余生命：1');
        expect(console.log).toHaveBeenCalledWith('张三攻击了李四, 李四受到了8点伤害, 李四剩余生命：4');
        expect(console.log).toHaveBeenCalledWith('李四攻击了张三, 张三受到了9点伤害, 张三剩余生命：-8');
    });
});