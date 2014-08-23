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
	if(extra && extra.type != 'strike') {
		this.extra.push(extra);		
	}
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	return this.getHurtLog(attacker, damage, extra);
};

Player.prototype.doAttack = function (defender, round) {
    var result = [];
    for(var i in this.extra) {
        var extra = this.extra[i];
        if(typeof(extra.remain) == 'number' && extra.remain <= 0) {
            continue;
        }
        if(typeof(extra.span) != 'number' || round % extra.span == 0) {
            this.life -= extra.damage;
            result.push(Log.getExtra(this, defender, extra));
        }
    }
    return result;
};

Player.prototype.getTotalDamage = function () {
	return this.attack + (this.weapon? this.weapon.damage: 0);
};

Player.prototype.getWeaponExtra = function () {
	return (this.weapon? this.weapon.getExtra(): null);
};

Player.prototype.getTotalDefence = function () {
	return this.shield? this.shield.defence: 0;
};

Player.prototype.getHurtLog = function(attacker, damage, extra) {
	return Log.getBeats(attacker, this) +
		Log.getDetails(attacker, this, damage, extra) +
		Log.getRemain(this);
};
