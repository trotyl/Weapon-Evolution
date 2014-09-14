describe('In level 3 ', function () {
    var console, game, player_1, player_2, weapon;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        weapon = new Weapon('优质木棒', 2, 0, 'medium');
        player_1 = new Player('张三', 10, 8, 'soldier', weapon);
        player_2 = new Player('李四', 20, 9, 'normal');
        game = new Game(console, player_1, player_2);
    });

    it('player can have role property', function () {
        expect(player_1.role).toBeTruthy();
        expect(player_2.role).toBeTruthy();
    });

    it('game should output a attack with both name and role', function() {
        game.play();
        expect(console.log).toHaveBeenCalledWith('战士张三用优质木棒攻击了普通人李四, 李四受到了10点伤害, 李四剩余生命：10');
        expect(console.log).toHaveBeenCalledWith('普通人李四攻击了战士张三, 张三受到了9点伤害, 张三剩余生命：1');
    });

    it('weapon should have additional damage', function () {
        expect(weapon.damage).toBeTruthy();
    });
});