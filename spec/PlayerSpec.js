describe('Player', function () {
	var player, another, weapon;

	beforeEach(function () {
        weapon = new Weapon('倚天剑', 0, 'medium');
		player = new Player('张三', 100, 10, '普通人');
		another = new Player('李四', 50, 20, '战士', weapon);
	});

	it('should begin with the right attritubes', function () {
		expect(player.name).toEqual('张三');
		expect(player.life).toEqual(100);
		expect(player.attack).toEqual(10);
	});

	it('should get hurt when be attacked', function () {
		player.getHurt(another);
		expect(player.life).toEqual(80);
		player.getHurt(another);
		expect(player.life).toEqual(60);
	});

    it('should get 3x damage if got strike', function () {
        spyOn(weapon, 'getExtra').and.returnValue(new Extra('strike'));
        player.getHurt(another);
        expect(player.life).toEqual(40);
    });

	it('should be dead when have no life left', function () {
		player.getHurt(another);
		player.getHurt(another);
		player.getHurt(another);
		player.getHurt(another);
		player.getHurt(another);
		expect(player.status).toEqual('dead');
	});

    it('should be hurt each round if got poisoned', function () {
        player.extras.push(new Extra('toxin', 2));
        player.doAttack(another, 1);
        expect(player.life).toEqual(98);
        player.doAttack(another, 2);
        expect(player.life).toEqual(96);
        player.doAttack(another, 3);
        expect(player.life).toEqual(94);
        player.doAttack(another, 4);
        expect(player.life).toEqual(92);
    });

    it('should be hurt each round if got fired', function () {
        player.extras.push(new Extra('flame', 2));
        player.doAttack(another, 1);
        expect(player.life).toEqual(98);
    });

    it('should not attack each 2 round if got frozen', function () {
        player.extras.push(new Extra('frozen'));
        expect(player.doAttack(another, 1)).toEqual([]);
        expect(player.doAttack(another, 2)).toEqual([]);
        expect(player.doAttack(another, 3)).toEqual(['张三冻得直哆嗦, 没有击中李四']);
        expect(player.doAttack(another, 4)).toEqual([]);
    });

    it('should not attack for 2 round got faint', function () {
        player.extras.push(new Extra('faint'));
        expect(player.doAttack(another)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：1轮']);
        expect(player.doAttack(another)).toEqual(['张三晕倒了, 无法攻击, 眩晕还剩：0轮']);
        expect(player.doAttack(another)).toEqual([]);
    });

    it('should only got 1 type of extra damage', function () {
        player.extras.push(new Extra('toxin', 5));
        spyOn(weapon, 'getExtra').and.returnValue(new Extra('flame', 2));
        player.getHurt(another);
        expect(player.extras.length).toEqual(1);
    });

    it('could get more than one same type of extra damage', function () {
        player.extras.push(new Extra('toxin', 5));
        spyOn(weapon, 'getExtra').and.returnValue(new Extra('toxin', 2));
        player.getHurt(another);
        expect(player.extras.length).toEqual(2);
    });

    it('\'s extra damage should not be affect by strike', function () {
        player.extras.push(new Extra('toxin', 5));
        spyOn(weapon, 'getExtra').and.returnValue(new Extra('strike'));
        player.getHurt(another);
        expect(player.extras.length).toEqual(1);
        expect(player.extras[0].type).toEqual('toxin');
    })
});
