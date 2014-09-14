describe('In level 5 ', function () {
    var console, game, player_1, player_2, weapon;

    beforeEach(function () {
        console = {log: null};
        spyOn(console, 'log');

        weapon = new Weapon('优质毒剑', 2, 0, 'medium');
        player_1 = new Player('张三', 10, 8, 'soldier');
        player_2 = new Player('李四', 20, 9, 'normal');
        game = new Game(console, player_1, player_2);
    });

    it('weapon should have effect property', function () {
        expect(weapon.effect).toBeTruthy();
    });

    it('abnormal player should be able to wear shield', function () {
        player_1.setWeapon(weapon);
        expect(player_1.weapon.name).toEqual(weapon.name);
        player_2.setWeapon(weapon);
        expect(player_2.weapon.type).toEqual('null');
    });

    it('assassin can wear short and medium weapon', function () {
        var player = new Player('', 0, 0, 'assassin');
        var short_weapon = new Weapon('short_weapon', 0, 0, 'short');
        var medium_weapon = new Weapon('medium_weapon', 0, 0, 'medium');
        var long_weapon = new Weapon('long_weapon', 0, 0, 'long');
        player.setWeapon(short_weapon);
        expect(player.weapon.name).toEqual('short_weapon');
        player.removeWeapon();
        player.setWeapon(medium_weapon);
        expect(player.weapon.name).toEqual('medium_weapon');
        player.removeWeapon();
        player.setWeapon(long_weapon);
        expect(player.weapon.type).toEqual('null');
    });

    it('soldier can wear medium weapon', function () {
        var player = new Player('', 0, 0, 'soldier');
        var short_weapon = new Weapon('short_weapon', 0, 0, 'short');
        var medium_weapon = new Weapon('medium_weapon', 0, 0, 'medium');
        var long_weapon = new Weapon('long_weapon', 0, 0, 'long');
        player.setWeapon(short_weapon);
        expect(player.weapon.type).toEqual('null');
        player.removeWeapon();
        player.setWeapon(medium_weapon);
        expect(player.weapon.name).toEqual('medium_weapon');
        player.removeWeapon();
        player.setWeapon(long_weapon);
        expect(player.weapon.type).toEqual('null');
    });

    it('knight can wear medium and long weapon', function () {
        var player = new Player('', 0, 0, 'knight');
        var short_weapon = new Weapon('short_weapon', 0, 0, 'short');
        var medium_weapon = new Weapon('medium_weapon', 0, 0, 'medium');
        var long_weapon = new Weapon('long_weapon', 0, 0, 'long');
        player.setWeapon(short_weapon);
        expect(player.weapon.type).toEqual('null');
        player.removeWeapon();
        player.setWeapon(medium_weapon);
        expect(player.weapon.name).toEqual('medium_weapon');
        player.removeWeapon();
        player.setWeapon(long_weapon);
        expect(player.weapon.name).toEqual('long_weapon');
    });

    it('normal one can not wear weapon', function () {
        var player = new Player('', 0, 0, 'normal');
        var short_weapon = new Weapon('short_weapon', 0, 0, 'short');
        var medium_weapon = new Weapon('medium_weapon', 0, 0, 'medium');
        var long_weapon = new Weapon('long_weapon', 0, 0, 'long');
        player.setWeapon(short_weapon);
        expect(player.weapon.type).toEqual('null');
        player.removeWeapon();
        player.setWeapon(medium_weapon);
        expect(player.weapon.type).toEqual('null');
        player.removeWeapon();
        player.setWeapon(long_weapon);
        expect(player.weapon.type).toEqual('null');
    });

    it('long weapon have repel property and can attack with distance 2', function () {
        spyOn(player_1.weapon, 'getEffect').and.returnValue({ repel: true });
        game.distance = 1;
        player_2.doDefence(player_1, game);
        expect(game.distance).toBe(2);
    });

    it('player without attack range must forward first', function () {
        game.distance = 2;
        player_1.doDefence(player_2, game);
        expect(player_1.life).toBe(10);
        expect(game.distance).toBe(1);
        player_1.doDefence(player_2, game);
        expect(player_1.life).toBe(1);
        expect(game.distance).toBe(1);
    });

    it('knight can both forward and attack', function () {
        var player = new Player('', 10, 2, 'knight');
        game.distance = 2;
        player_1.doDefence(player, game);
        expect(player_1.life).toBe(8);
        expect(game.distance).toBe(1);
    });

    it('double attack could cause double attack', function () {
        player_1.setWeapon(weapon);
        spyOn(player_1.weapon, 'getEffect').and.returnValue({ double: true });
        player_2.doDefence(player_1, game);
        expect(player_2.life).toBe(0);
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
