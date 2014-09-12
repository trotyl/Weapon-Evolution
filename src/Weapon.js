function Weapon (name, damage, type, extras) {
	this.name = name;
	this.damage = damage;
    this.type = type;
	this.extras = extras || [];
}

Weapon.none = function() {
    return new Weapon('', 0, 'null', []);
};

Weapon.prototype.getExtra = function() {
	return this.extra[Math.floor(Math.random() * 1000) % (this.extra.length * 2)];
};
