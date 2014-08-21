function Extra (type, damage) {
    var extraMap = {
        toxin:{
            name: '毒性',
            describe: '中毒',
            damage: damage,
            span: 0,
            remain: -1
        },
        flame:{
            name: '火焰',
            describe: '着火',
            damage: damage,
            span: 0,
            remain: -1
        },
        frozen:{
            name: '冰冻',
            describe: '冻僵',
            damage: 0,
            span: 2,
            remain: -1
        },
        faint:{
            name: '击晕',
            describe: '晕倒',
            damage: 0,
            span: 0,
            remain: 2
        },
        strike:{
            name: '致命一击',
            describe: '中毒',
            damage: '3x',
            span: 0,
            remain: 0
        }
    };

    this.type = type;
    this.name = extraMap[type].name;
    this.describe = extraMap[type].describe;
    this.damage = extraMap[type].damage;
    this.span = extraMap[type].span;
    this.remain = extraMap[type].remain;
}
