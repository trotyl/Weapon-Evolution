function Game (console, player_1, player_2) {
	this.console = console;
	this.players = [player_1, player_2];
	this.turn = true;
	this.status = 'run';
}

Game.prototype.play = function() {
	while(this.status == 'run') {
		var attacker = this.players[this.turn? 0: 1];
		var defender = this.players[!this.turn? 0: 1];
		var over = defender.hurt(attacker.attack);
		var log = attacker.name + '攻击了' + defender.name + ',' + defender.name + '受到了' + attacker.attack 
			+ '点伤害,' + defender.name + '剩余生命：' + defender.life;
		this.console.log(log);
		if(over) {
			this.status = 'over';
			this.console.log(defender.name + '被打败了.');
		}
		this.turn = !this.turn;
	}
};

