function Log () {
}

Log.getBeats = function (attacker, defender) {
	return attacker.role + attacker.name + (attacker.weapon? '用' + attacker.weapon.name: '') +
		'攻击了' + defender.role + defender.name + ', ';
};

Log.getDetails = function (attacker, defender, damage, extra) {
	var mainBody = defender.name + '受到了' + damage + '点伤害, ';
	var extraText = '';
	var before = false;
	if(extra && extra.type == 'strike') {
		extraText = attacker.name + '发动了致命一击' + ', ';
		before = true;
	}
	else if(extra) {
		extraText = defender.name + extra.describe + '了, '; 
	}
	return before? extraText + mainBody: mainBody + extraText;
};

Log.getRemain = function (player) {
	return player.name + '剩余生命：' + player.life;
};

Log.getExtra = function (attacker, defender, extra) {
	var map = {
		toxin: attacker.name + '受到' + extra.damage + '点毒性伤害, ' + attacker.name + '剩余生命：' + attacker.life;
		flame: attacker.name + '受到' + extra.damage + '点火焰伤害, ' + attacker.name + '剩余生命：' + attacker.life;
		frozen: attacker.name + '冻得直哆嗦, 没有击中' + defender.name;
		faint: attacker.name + '晕倒了, 无法攻击, 眩晕还剩：' + extra.remain-- + '轮';
	}
	return map[extra.type];
};
