function Player (name, life, attack, role, weapon, shield) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.role = role;
	this.weapon = weapon;
	this.shield = shield;
	this.status = "alive";
}

Player.prototype.getHurt = function (attacker) {
	var damage = attacker.getTotalDamage() - this.getTotalDefence();
	damage = damage < 0? 0: damage;
	this.extra = attacker.getWeaponExtra();
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	return this.status != 'alive';
};

Player.prototype.getTotalDamage = function () {
	return this.attack + (this.weapon? this.weapon.damage: 0);
};

Player.prototype.getWeaponExtra = function () {
	return this.weapon? this.weapon.getExtra(): null;
};

Player.prototype.getTotalDefence = function () {
	return this.shield? this.shield.defence: 0;
};
