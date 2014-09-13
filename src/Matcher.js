function Matcher () {

}

Matcher.checkWeapon = function(role, type) {
    return role.weaponType[type];
};

Matcher.checkDistance = function(distance, range) {
    return distance <= range;
};
