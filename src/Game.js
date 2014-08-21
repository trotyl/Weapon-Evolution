function Game (console, player_1, player_2) {
	this.console = console;
	this.players = [player_1, player_2];
	this.turn = true;
	this.status = 'run';
	this.round = 1;
}

Game.prototype.play = function() {
	while(this.status == 'run') {
		var attacker = this.players[this.turn? 0: 1];
		var defender = this.players[!this.turn? 0: 1];

		var over = defender.getHurt(attacker);

		this.console.log(Game.getLog(attacker, defender));

		if(over) {
			this.status = 'over';
			this.console.log(defender.name + '被打败了.');
		}
		this.turn = !this.turn;
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
