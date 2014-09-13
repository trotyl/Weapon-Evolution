function Game (console, player_1, player_2) {
	this.console = console;
	this.players = [player_1, player_2];
	this.turn = true;
	this.status = 'run';
	this.round = 1;
    this.distance = 1;
}

Game.prototype.play = function() {
	while(this.status == 'run' && this.round < 100) {
		var attacker = this.players[this.turn? 0: 1];
		var defender = this.players[!this.turn? 0: 1];

        if(!Matcher.checkDistance(this.distance, attacker.weapon.range)) {
            this.distance--;
            continue;
        }

        var beforeResult = attacker.doAttack(defender, this.round);
        _(beforeResult).each(function(result) {
            this.console.log(result);
        }, this);

        if(this.checkPlayer(attacker)) {
            return;
        }

		var afterResult = defender.doDefence(attacker, this.distance);
		this.console.log(afterResult);

        if(this.checkPlayer(defender)) {
            return;
        }

        this.goingOn();
	}
};

Game.prototype.checkPlayer = function (player) {
    if(player.status != 'alive') {
        this.status = 'over';
        this.console.log(Logger.getDeath(player));
        return true;
    }
};

Game.prototype.goingOn = function () {
    this.turn = !this.turn;
    this.round++;
};

//保留功能

Game.prototype.setPlayerA = function(player) {
    this.players[0] = player;
};

Game.prototype.setPlayerB = function(player) {
    this.players[1] = player;
};
