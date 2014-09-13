describe('In level 4 ', function () {
    var console, game, player_1, player_2, weapon;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        weapon = new Weapon('优质毒剑', 2, 'medium');
        player_1 = new Player('张三', 10, 8, '战士');
        player_2 = new Player('李四', 20, 9, '普通人');
        game = new Game(console, player_1, player_2);
    });

    it('weapon should have effect property', function () {
        expect(weapon.effect).toBeTruthy();
    });

    it('abnormal player should be able to wear shield', function () {
        player_1.setWeapon(weapon);
        expect(player_1.weapon.name).toEqual(weapon.name);
        player_2.setWeapon(weapon);
        expect(player_2.weapon).toBeFalsy();
    });

    it('assassin can wear short and medium weapon', function () {
        var player = new Player('', 0, 0, '刺客');
        var short_weapon = new Weapon('short_weapon', 0, 'short');
        var medium_weapon = new Weapon('medium_weapon', 0, 'medium');
        var long_weapon = new Weapon('long_weapon', 0, 'long');
        player.setWeapon(short_weapon);
        expect(player.weapon.name).toEqual('short_weapon');
        player.removeWeapon();
        player.setWeapon(medium_weapon);
        expect(player.weapon.name).toEqual('medium_weapon');
        player.removeWeapon();
        player.setWeapon(long_weapon);
        expect(player.weapon).toBeFalsy();
    });

    it('', function () {

    });

    it('', function () {

    });

    it('', function () {

    });

    it('', function () {

    });

    it('', function () {

    });

    it('', function () {

    });

});