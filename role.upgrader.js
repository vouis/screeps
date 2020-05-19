
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 U: Hrv');
        }
        else if (!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            creep.memory.upgrading = false;
            creep.say('🔄 U: Hrv');
        }
        else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('🚧 upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            //find_source1(creep)
            find_storage2_or_source2(creep)
        }
    }
};

module.exports = roleUpgrader;