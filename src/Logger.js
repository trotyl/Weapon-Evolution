function Logger () {
}

Logger.getBeats = function (attacker, defender) {
	return attacker.role.title + attacker.name + (attacker.weapon.name? '用' + attacker.weapon.name: '') +
		'攻击了' + defender.role.title + defender.name + ', ';
};

Logger.getDetails = function (attacker, defender, damage, extra) {
	var mainBody = defender.name + '受到了' + damage + '点伤害, ';
	var extraText = '';
	var before = false;
	if(extra && extra.type == 'strike') {
		extraText = attacker.name + '发动了致命一击' + ', ';
		before = true;
	}
	else if(extra && extra.type) {
		extraText = defender.name + extra.describe + '了, '; 
	}
	return before? extraText + mainBody: mainBody + extraText;
};

Logger.getRemain = function (player) {
	return player.name + '剩余生命：' + player.life;
};

Logger.getExtraDamage = function (attacker, defender, extra) {
	var map = {
		toxin: attacker.name + '受到' + extra.damage + '点毒性伤害, ' + attacker.name + '剩余生命：' + attacker.life,
		flame: attacker.name + '受到' + extra.damage + '点火焰伤害, ' + attacker.name + '剩余生命：' + attacker.life,
		frozen: attacker.name + '冻得直哆嗦, 没有击中' + defender.name,
		faint: attacker.name + '晕倒了, 无法攻击, 眩晕还剩：' + --extra.remain + '轮'
	};
	return map[extra.type];
};

Logger.getEffect = function (attacker, defender, effect, damage) {
    if(!effect) {
        return '';
    }
    if(effect.repel) {
        return defender.name + '被击退了, ';
    }
    if(effect.double) {
        return attacker.name + '发动了连击, ' + defender.name + '受到了' + damage[0] + '点伤害, ';
    }
    if(effect.defence) {
        return defender.name + '发动了隔挡反击, ' + attacker.name + '受到了' + damage[1] + '点伤害, ';
    }
    return '';
};

Logger.getDeath = function (player) {
    return player.name + '被打败了.';
};

Logger.getForward = function (attacker, defender) {
    return attacker.name + '靠近了' + defender.name + '.';
};
