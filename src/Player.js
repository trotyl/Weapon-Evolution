function Player (name, life, attack, role, weapon, shield) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.role = role || '普通人';
	this.weapon = weapon || Weapon.none();
	this.shield = shield || Shield.none();
	this.status = 'alive';
    this.extras = [];
}

Player.prototype.doDefence = function (attacker) {
	var damage = attacker.getTotalDamage() - this.getTotalDefence();
	damage = damage < 0? 0: damage;
    var extra = attacker.getWeaponExtra();
    damage = this.getExtraDamage(extra, damage);
	this.life -= damage;
	if(this.life <= 0) {
		this.status = 'dead';
	}
	return this.getDefenceLog(attacker, damage, extra);
};

Player.prototype.doAttack = function (defender, round) {
    var result = [];
    for(var i in this.extras) {
        var extra = this.extras[i];
        if(typeof(extra.remain) == 'number' && extra.remain <= 0) {
            continue;
        }
        if(typeof(extra.span) != 'number' || round % extra.span == 0) {
            this.life -= extra.damage;
            result.push(Logger.getExtraDamage(this, defender, extra));
        }
    }
    return result;
};

Player.prototype.getExtraDamage = function (extra, damage) {
    if(extra && extra.type != 'strike') {
        if(this.extras[0] && this.extras[0].type != extra.type) {
            this.extras = [];
        }
        this.extras.push(_.cloneDeep(extra));
    }
    else if(extra) {
        damage *= 3;
    }
    return damage;
};

Player.prototype.getTotalDamage = function () {
	return this.attack + (this.weapon? this.weapon.damage: 0);
};

Player.prototype.getWeaponExtra = function () {
	return (this.weapon? this.weapon.getExtraDamage(): null);
};

Player.prototype.getTotalDefence = function () {
	return this.shield? this.shield.defence: 0;
};

Player.prototype.getDefenceLog = function(attacker, damage, extra) {
	return Logger.getBeats(attacker, this) +
		Logger.getDetails(attacker, this, damage, extra) +
		Logger.getRemain(this);
};

//保留功能

Player.prototype.setRole = function(role) {
    this.role = role;
};

Player.prototype.setWeapon = function(weapon) {
    this.weapon = _.cloneDeep(weapon);
};

Player.prototype.setShield = function(shield) {
    this.weapon = _.cloneDeep(shield);
};

Player.prototype.removeWeapon = function () {
    this.weapon = Weapon.none();
};

Player.prototype.removeShield = function () {
    this.shield = Shield.none();
};
