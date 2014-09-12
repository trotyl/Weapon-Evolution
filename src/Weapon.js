function Weapon (name, damage, type, extras) {
	this.name = name;
	this.damage = damage;
    this.type = type;
	this.extras = extras || [];
    this.effect = Weapon.getEffect(type);
    this.range = Weapon.getRange(type);
}

Weapon.none = function() {
    return new Weapon(null, 0, 'null', []);
};

Weapon.prototype.getExtraDamage = function() {
	return this.extras[Math.floor(Math.random() * 1000) % (this.extras.length * 2)];
};

Weapon.getEffect = function (type) {
    var map = {
        long: {
            repel: true
        },
        middle: {},
        short: {}
    };
    return map[type];
};

Weapon.getRange = function (type) {
    var map = {
        long: 2,
        middle: 1,
        short: 1
    };
    return map[type];
};
