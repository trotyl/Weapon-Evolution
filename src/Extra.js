function Extra (type, damage) {
    var extraMap = {
        toxin:{
            type: '毒性',
            describe: '中毒',
            damage: damage,
            span: 0,
            last: -1
        },
        flame:{
                type: '火焰',
                describe: '着火',
                damage: damage,
                span: 0,
                last: -1
        },
        frozen:{
                type: '冰冻',
                describe: '冻僵',
                damage: 0,
                span: 2,
                last: -1
        },
        faint:{
                type: '击晕',
                describe: '晕倒',
                damage: 0,
                span: 0,
                last: 2
        },
        strike:{
                type: '致命一击',
                describe: '中毒',
                damage: '3x',
                span: 0,
                last: 0
        }
    };

    this.type = extraMap[type].type;
    this.describe = extraMap[type].describe;
    this.damage = extraMap[type].damage;
    this.span = extraMap[type].span;
    this.last = extraMap[type].last;
}
