// construct
spawnName = 'Spawn1'
tower =Game.getObjectById('5ec293036612cd7d2564f3c3') || null
storage =Game.getObjectById('5ec4620eb6a35c398e9783cb') || null
mode = 'base'

container_spawn=Game.getObjectById('60619e848532e078ac6919d2')
container_1 = Game.getObjectById('6061fc9bc5078b66d847289b')
container_2 = Game.getObjectById('6061f1ee5e99e45a74b56875')

source_1 = Game.getObjectById('5bbcad0e9099fc012e6368bf')
source_2 = Game.getObjectById('5bbcad0e9099fc012e6368c0')

find_source = function (creep,source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
find_structure= function (creep,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

find_structure_or_source = function (creep,source,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,source_1)
    }
}

to_structure = function (creep,structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        }
}

find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        return 0;
    }
}
let globals = {

}

module.exports =globals ;