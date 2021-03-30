to_destroy_building = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (targets) => targets.hits < targets.hitsMax
    });
    targets.sort((a, b) => a.hits - b.hits);
    if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            creep.say('repair');
        }
    }
}

var roleRepairer = {
    run: function (creep) {
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 R: Hrv');
        }
        else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            creep.memory.repairing = false;
            creep.say('🔄 R: Hrv');
        }
        else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            to_destroy_building(creep)
        }
        else {
            find_structure_or_source(creep,source_2,container_2)
        }

    }
};

module.exports = roleRepairer;