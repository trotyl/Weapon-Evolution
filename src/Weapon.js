function Weapon (name, damage, extra) {
	this.name = name;
	this.damage = damage;
	this.extra = extra;
}

Weapon.prototype.getExtra = function() {
	return this.extra[Math.floor(Math.random() * 1000) % (this.extra.length * 2)];
};

Weapon.prototype.getDamage = function() {

};

