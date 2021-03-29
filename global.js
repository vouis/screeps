let globals = function () {
// construct
    globals.spawnName = 'Spawn1'
    globals.tower = Game.getObjectById('5ec293036612cd7d2564f3c3') || null;
    globals.storage = Game.getObjectById('5ec4620eb6a35c398e9783cb') || null;

// develop mode

    globals.mode = 'base';
}

module.exports =globals ;