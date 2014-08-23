describe('Weapon', function () {
    var weapon, superWeapon;

    beforeEach(function () {
        weapon = new Weapon('方天画戟', 20);
        superWeapon = new Weapon('轩辕剑', 50, [new Extra('toxin', 5)]);
    });

    it('should begin with the right attritubes', function () {
        expect(weapon.name).toEqual('方天画戟');
        expect(weapon.damage).toEqual(20);
        expect(weapon.extra).toEqual([]);
        expect(superWeapon.name).toEqual('轩辕剑');
        expect(superWeapon.damage).toEqual(50);
        expect(superWeapon.extra.length).toEqual(1);
        expect(superWeapon.extra[0].damage).toEqual(5);
    });

});