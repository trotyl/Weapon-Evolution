function Weapon (name, damage, defence, type, extras) {
	this.name = name;
	this.damage = damage;
    this.defence = defence;
    this.type = type;
	this.extras = extras || [];
    this.effect = Weapon.initEffect(type);
    this.range = Weapon.initRange(type);
}

Weapon.none = function() {
    return new Weapon(null, 0, 0, 'null', []);
};

Weapon.prototype.getExtraDamage = function() {
	return this.extras[Math.floor(Math.random() * 1000) % (this.extras.length * 2)];
};

Weapon.prototype.getEffect = function(rand) {
    return (rand || (Math.random() * 4)) <= 1? this.effect: null;
};

Weapon.prototype.addExtra = function (extra) {
    this.extras.push(extra);
};

Weapon.prototype.clearExtra = function () {
    this.extras = [];
};

Weapon.initEffect = function (type) {
    var map = {
        long: {
            repel: true
        },
        medium: {
            defence: true
        },
        short: {
            double: true
        }
    };
    return map[type];
};

Weapon.initRange = function (type) {
    var map = {
        long: 2,
        medium: 1,
        short: 1,
        null: 1
    };
    return map[type];
};
