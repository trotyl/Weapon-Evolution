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
		if(defender.hurt(attacker.attack)) {
			this.status = 'over';
			this.console.log(defender.name + '被打败了.');
		}
		this.turn = !this.turn;
	}
};

