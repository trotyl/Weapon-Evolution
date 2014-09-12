function Role(name) {
    this.name = name;
    this.weaponType = Role.getAllowedWeapon(name);
}

Role.getAllowedWeapon = function(name) {
    var map = {
        normal: {},
        assassin: {
            medium: true,
            short: true
        },
        soldier: {
            medium: true
        },
        knight: {
            long: true,
            medium: true
        }
    };
    return map[name];
};
