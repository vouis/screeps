// construct
export const spawnName = 'Spawn1'
export const tower =Game.getObjectById('5ec293036612cd7d2564f3c3') || null
export const storage =Game.getObjectById('5ec4620eb6a35c398e9783cb') || null
export const mode = 'base'

export const container_spawn=Game.getObjectById('60619e848532e078ac6919d2')
export const container_1 = Game.getObjectById('6061fc9bc5078b66d847289b')
export const container_2 = Game.getObjectById('6061f1ee5e99e45a74b56875')

export const source_1 = Game.getObjectById('5bbcad0e9099fc012e6368bf')
export const source_2 = Game.getObjectById('5bbcad0e9099fc012e6368c0')

export const find_source = function (creep,source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
export const find_structure= function (creep,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

export const find_structure_or_source = function (creep,source,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,source)
    }
}

export const to_structure = function (creep,structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        }
}

export const find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        return 0;
    }
}