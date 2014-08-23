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

    it('should be hurt each round if got poisoned', function () {
        player.extra.push(new Extra('toxin', 2));
        player.doAttack(attacker, 1);
        expect(player.life).toEqual(98);
        player.doAttack(attacker, 2);
        expect(player.life).toEqual(96);
        player.doAttack(attacker, 3);
        expect(player.life).toEqual(94);
        player.doAttack(attacker, 4);
        expect(player.life).toEqual(92);
    });

    it('should be hurt each round if got fired', function () {
        player.extra.push(new Extra('flame', 2));
        player.doAttack(attacker, 1);
        expect(player.life).toEqual(98);
    });

    it('should not attack each 2 round if got frozen', function () {
        player.extra.push(new Extra('frozen'));
        expect(player.doAttack(attacker, 1)).toEqual([]);
        expect(player.doAttack(attacker, 2)).toEqual([]);
        expect(player.doAttack(attacker, 3)).toEqual(['张三冻得直哆嗦, 没有击中李四']);
        expect(player.doAttack(attacker, 4)).toEqual([]);
    });

    it('should not attack for 2 round got faint', function () {
        player.extra.push(new Extra('faint'));
        expect(player.doAttack(attacker)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：1轮']);
        expect(player.doAttack(attacker)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：0轮']);
        expect(player.doAttack(attacker)).toEqual([]);
    });

    xit('should be hurt each round if got poisoned', function () {
        player.extra.push(new Extra('toxin', 2));
        player.doAttack(attacker);
        expect(player.life).toEqual(98);
    });

    xit('should be hurt each round if got poisoned', function () {
        player.extra.push(new Extra('toxin', 2));
        player.doAttack(attacker);
        expect(player.life).toEqual(98);
    });
});
