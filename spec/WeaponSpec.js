describe('Weapon', function () {
    var weapon, superWeapon;

    beforeEach(function () {
        weapon = new Weapon('方天画戟', 20);
        superWeapon = new Weapon('轩辕剑', 50, new Extra('toxin', 5));
    })
});