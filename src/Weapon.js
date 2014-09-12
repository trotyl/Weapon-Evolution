function Weapon (name, damage, type, extras) {
	this.name = name;
	this.damage = damage;
    this.type = type;
	this.extras = extras || [];
}

Weapon.none = function() {
    return new Weapon(null, 0, 'null', []);
};

Weapon.prototype.getExtraDamage = function() {
	return this.extras[Math.floor(Math.random() * 1000) % (this.extras.length * 2)];
};
