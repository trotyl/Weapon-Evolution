function Player (name, life, attack, role, weapon, shield) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.role = role;
	this.weapon = weapon;
	this.shield = shield;
	this.status = "alive";
}

Player.prototype.hurt = function (damage) {
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	return this.status != 'alive';
};
