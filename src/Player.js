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
	var extra = attacker.getWeaponExtra();
	if(extra.type != 'strike') {
		this.extra.push(extra);		
	}
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	var log = this.getHurtLog(attacker, damage, extra);
	return log;
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

Player.prototype.getHurtLog = function(attacker, damage, extra) {
	var log = Log.getBeats(attacker, this) +
		Log.getDetails(attacker, this, damage, extra) +
		Log.getRemain();
	return log;
};

Player.prototype.getAttackLog = function(defender) {
	var result = '';
	for(var i in this.extra) {
		var extra = this.extra[i];
		if(extra.)
		result += Log.getExtra(this, defender, this.extra[i]);
		if(i != this.extra.length - 1) {
			result += '\n';
		}
	}
	return result;
};
