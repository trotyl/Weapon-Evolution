function Player (name, life, attack, role, weapon, shield) {
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.role = new Role(role);
	this.weapon = weapon || Weapon.none();
	this.shield = shield || Shield.none();
	this.status = 'alive';
    this.extras = [];
}

Player.prototype.doDefence = function (attacker, game) {
    var result = [];
    if(!Matcher.checkDistance(game.distance, attacker.weapon.range)) {
        game.distance--;
        result.push(Logger.getForward(attacker, this));
        if(attacker.role.name != 'knight') {
            return result;
        }
    }

	var raw = attacker.getTotalDamage() - this.getTotalDefence();
	raw = raw < 0? 0: raw;
    var extra = attacker.getWeaponExtra();
    var damage = this.getExtraDamage(extra, raw);

    var effect = attacker.weapon.getEffect() || {};
    var localEffect = this.weapon.getEffect() || {};
    effect = _(effect).assign(localEffect).value();
    if(effect.repel) {
        game.distance++;
        this.life -= damage;
    }
    else if(effect.double) {
        this.life -= damage * 2;
    }
    else {
        this.life -= damage;
    }
    if(effect.defence) {
        attacker.life -= this.weapon.defence;
    }

    if(this.life <= 0) {
        this.status = 'dead';
    }
    if(attacker.life <= 0) {
        attacker.status = 'dead';
    }
    result.push(this.getDefenceLog(attacker, damage, extra, effect));
	return result;
};

Player.prototype.doAttack = function (defender, game) {
    var result = [];

    _(this.extras).each(function(extra) {
        if(typeof(extra.remain) == 'number' && extra.remain <= 0) {}
        else if(typeof(extra.span) != 'number' || game.round % extra.span == 0) {
            this.life -= extra.damage;
            result.push(Logger.getExtraDamage(this, defender, extra));
        }
    }, this);
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

Player.prototype.getDefenceLog = function(attacker, damage, extra, effect) {
    var detailMessage = Logger.getDetails(attacker, this, damage, extra);
    var effectMessage = Logger.getEffect(attacker, this, effect, [damage, this.getTotalDamage()]);
	var result = Logger.getBeats(attacker, this) +
		detailMessage +
        effectMessage +
		Logger.getRemain(this);
    if(effect && effect.defence) {
        result += ', ' + Logger.getRemain(attacker);
    }
    return result;
};

//保留功能

Player.prototype.setRole = function(role) {
    this.role = role;
};

Player.prototype.setWeapon = function(weapon) {
    this.removeWeapon();
    if(!Matcher.checkWeapon(this.role, weapon.type)) {
        return;
    }
    this.weapon = weapon;
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
