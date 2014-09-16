describe('Weapon', function () {
    var weapon, superWeapon;

    beforeEach(function () {
        weapon = new Weapon('方天画戟', 20, 'long');
        superWeapon = new Weapon('轩辕剑', 50, 'medium', [new ExtraDamage('toxin', 5)]);
    });

    it('should begin with the right attritubes', function () {
        expect(weapon.name).toEqual('方天画戟');
        expect(weapon.damage).toEqual(20);
        expect(weapon.type).toEqual('long');
        expect(weapon.extras).toEqual([]);
        expect(superWeapon.name).toEqual('轩辕剑');
        expect(superWeapon.damage).toEqual(50);
        expect(superWeapon.type).toEqual('medium');
        expect(superWeapon.extras.length).toEqual(1);
        expect(superWeapon.extras[0].damage).toEqual(5);
    });

    it('should generate the right none state', function() {
        expect(Weapon.none().name).toEqual(null);
        expect(Weapon.none().damage).toEqual(0);
        expect(Weapon.none().type).toEqual('null');
        expect(Weapon.none().extras.length).toBe(0);
    });

    it('should be able to initiate properly', function() {
        expect(weapon.getEffect(1).repel).toBe(true);
    });
});