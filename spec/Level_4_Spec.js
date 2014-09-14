describe('In level 4 ', function () {
    var console, game, player_1, player_2, weapon;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        weapon = new Weapon('优质毒剑', 2, 0, 'medium');
        player_1 = new Player('张三', 10, 8, 'soldier', weapon);
        player_2 = new Player('李四', 20, 9, 'normal');
        game = new Game(console, player_1, player_2);
    });

    it('weapon can have extra property', function () {
        expect(player_1.role).toBeTruthy();
        expect(player_2.role).toBeTruthy();
    });

    it('player should be hurt each round if got poisoned', function () {
        player_1.extras.push(new ExtraDamage('toxin', 2));
        player_1.doAttack(player_2, game);
        expect(player_1.life).toEqual(8);
        player_1.doAttack(player_2, game);
        expect(player_1.life).toEqual(6);
        player_1.doAttack(player_2, game);
        expect(player_1.life).toEqual(4);
    });

    it('player should be hurt each round if got fired', function () {
        player_1.extras.push(new ExtraDamage('flame', 2));
        player_1.doAttack(player_2, game);
        expect(player_1.life).toEqual(8);
    });

    it('player should not attack each 2 round if got frozen', function () {
        player_1.extras.push(new ExtraDamage('frozen'));
        game.round = 1;
        expect(player_1.doAttack(player_2, game)).toEqual([]);
        game.round = 2;
        expect(player_1.doAttack(player_2, game)).toEqual([]);
        game.round = 3;
        expect(player_1.doAttack(player_2, game)).toEqual(['张三冻得直哆嗦, 没有击中李四']);
        game.round = 4;
        expect(player_1.doAttack(player_2, game)).toEqual([]);
        game.round = 5;
        expect(player_1.doAttack(player_2, game)).toEqual([]);
        game.round = 6;
        expect(player_1.doAttack(player_2, game)).toEqual(['张三冻得直哆嗦, 没有击中李四']);
    });

    it('player should not attack for 2 round got faint', function () {
        player_1.extras.push(new ExtraDamage('faint'));
        expect(player_1.doAttack(player_2, game)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：1轮']);
        expect(player_1.doAttack(player_2, game)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：0轮']);
        expect(player_1.doAttack(player_2, game)).toEqual([]);
    });

    it('player should get 3x damage if got strike', function () {
        spyOn(weapon, 'getExtraDamage').and.returnValue(new ExtraDamage('strike'));
        player_2.doDefence(player_1, game);
        expect(player_2.life).toEqual(-10);
    });

    it('game should output a attack with extra attribute', function() {
        spyOn(weapon, 'getExtraDamage').and.returnValue(new ExtraDamage('toxin', 2));
        game.play();
        expect(console.log).toHaveBeenCalledWith('战士张三用优质毒剑攻击了普通人李四, 李四受到了10点伤害, 李四中毒了, 李四剩余生命：10');
        expect(console.log).toHaveBeenCalledWith('李四受到2点毒性伤害, 李四剩余生命：8');
    });

    it('player should only got 1 type of extra damage', function () {
        player_2.extras.push(new ExtraDamage('toxin', 5));
        spyOn(weapon, 'getExtraDamage').and.returnValue(new ExtraDamage('flame', 2));
        player_2.doDefence(player_1, game);
        expect(player_2.extras.length).toEqual(1);
    });

    it('player could get more than one same type of extra damage', function () {
        player_2.extras.push(new ExtraDamage('toxin', 5));
        spyOn(weapon, 'getExtraDamage').and.returnValue(new ExtraDamage('toxin', 2));
        player_2.doDefence(player_1, game);
        expect(player_2.extras.length).toEqual(2);
        player_2.doAttack(player_1, game);
        expect(player_2.life).toBe(3);
    });

    it('player \'s extra damage should not be affect by strike', function () {
        player_1.extras.push(new ExtraDamage('toxin', 5));
        spyOn(weapon, 'getExtraDamage').and.returnValue(new ExtraDamage('strike'));
        player_1.doDefence(player_2, game);
        expect(player_1.extras.length).toEqual(1);
        expect(player_1.extras[0].type).toEqual('toxin');
    });

});