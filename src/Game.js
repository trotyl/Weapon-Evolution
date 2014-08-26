function Game (console, player_1, player_2) {
	this.console = console;
	this.players = [player_1, player_2];
	this.turn = true;
	this.status = 'run';
	this.round = 1;
}

Game.prototype.play = function() {
	while(this.status == 'run' && this.round < 10) {
		var attacker = this.players[this.turn? 0: 1];
		var defender = this.players[!this.turn? 0: 1];

        var beforeResult = attacker.doAttack(defender, this.round);
        if(beforeResult) {
            for(var i in beforeResult) {
                this.console.log(beforeResult[i]);
            }
        }

        if(attacker.status != 'alive') {
            this.status = 'over';
            this.console.log(Logger.getDeath(attacker));
            return;
        }

		var afterResult = defender.getHurt(attacker);
		this.console.log(afterResult);

		if(defender.status != 'alive') {
            this.status = 'over';
            this.console.log(Logger.getDeath(defender));
            return;
		}
		this.turn = !this.turn;
        this.round++;
	}
};

Game.getLog = function(attacker, defender) {
	var result = attacker.role + attacker.name;
	if(attacker.weapon) {
		result += '用' + attacker.weapon.name;
	}
	result += '攻击了' + defender.role + defender.name + ',' + defender.name + '受到了' 
		+ Game.getDamage(attacker,defender) + '点伤害,' + defender.name + '剩余生命：' + defender.life;
	return result;
};

Game.getDamage = function (attacker, defender) {
	return attacker.attack 
		+ (attacker.weapon? attacker.weapon.damage: 0) 
		- (defender.shield? defender.shield.defence: 0);
};
