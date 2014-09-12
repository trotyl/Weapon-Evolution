function Role(name) {
    this.name = name;
    this.weaponType = Role.getAllowedWeapon(name);
    this.range = Role.getMaxRange(name);
}

Role.getAllowedWeapon = function(name) {
    var map = {
        normal: {},
        assassin: {
            middle: true,
            short: true
        },
        soldier: {
            middle: true
        },
        knight: {
            long: true,
            middle: true
        }
    };
    return map[name];
};

Role.getMaxRange = function (name) {
    var map = {
        normal: 1,
        assassin: 1,
        soldier: 1,
        knight: 2
    };
    return map[name];
};
