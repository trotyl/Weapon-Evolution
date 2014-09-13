function Role(name) {
    console.log(name);
    this.name = name;
    this.title = Role.getTitle(name);
    this.weaponType = Role.getAllowedWeapon(name);
}

Role.getTitle = function (name) {
    var map = {
        normal: '普通人',
        assassin: '刺客',
        soldier: '战士',
        knight: '骑士'
    };
    return map[name] || '';
};

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
