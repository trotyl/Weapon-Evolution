function Player (name, life, attack) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.status = "alive";
}

Player.prototype.hurt = function (damage) {
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	return this.status != 'alive';
};
