function Player (name, life, attack, role, weapon, shield) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.role = role;
	this.weapon = weapon;
	this.shield = shield;
	this.status = "alive";
    this.extra = [];
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
        return Log.getDeath(this);
	}
	return this.getHurtLog(attacker, damage, extra);
};

Player.prototype.getTotalDamage = function () {
	return this.attack + (this.weapon? this.weapon.damage: 0);
};

Player.prototype.getWeaponExtra = function () {
	return (this.weapon? this.weapon.getExtra(): {type: null}) || {type: null};
};

Player.prototype.getTotalDefence = function () {
	return this.shield? this.shield.defence: 0;
};

Player.prototype.getHurtLog = function(attacker, damage, extra) {
	return Log.getBeats(attacker, this) +
		Log.getDetails(attacker, this, damage, extra) +
		Log.getRemain(this);
};

Player.prototype.getAttackLog = function(defender) {
	var result = [];
	for(var i in this.extra) {
		var extra = this.extra[i];
		if(extra) {
            result.push(Log.getExtra(this, defender, extra));
        }
	}
	return result;
};
