function Role(name) {
    this.name = name;
    this.weaponType = Role.getAllowedWeapon(name);
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
