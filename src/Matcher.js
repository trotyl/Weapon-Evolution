function Matcher () {

}

Matcher.checkWeapon = function(role, type) {

};

Matcher.checkDistance = function(distance, range) {
    range = range || 1;
    return distance <= range;
};
