function Game (console, player_1, player_2) {
	this.console = console;
	this.players = [player_1, player_2];
	this.turn = true;
	this.status = 'run';
	this.round = 1;
}

Game.prototype.setPlayerA = function(player) {
    this.players[0] = player;
};

Game.prototype.setPlayerB = function(player) {
    this.players[1] = player;
};

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

		var afterResult = defender.doDefence(attacker);
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
