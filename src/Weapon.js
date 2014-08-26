function Weapon (name, damage, type, extra) {
	this.name = name;
	this.damage = damage;
    this.type = type;
	this.extra = extra || [];
}

Weapon.prototype.getExtra = function() {
	return this.extra[Math.floor(Math.random() * 1000) % (this.extra.length * 2)];
};
