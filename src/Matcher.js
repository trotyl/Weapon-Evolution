function Matcher () {

}

Matcher.checkWeapon = function (role, type) {
    var checkList = {
        刺客_medium: true,
        刺客_short: true,
        战士_medium: true,
        骑士_long: true,
        骑士_medium: true
    };
    return !!checkList[role + '_' + type];
};
