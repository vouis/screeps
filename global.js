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

find_source1 = function (creep) {
    if (creep.harvest(sources_1) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources_1, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

find_source2 = function (creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
find_storage = function (creep) {
    var sources = Game.getObjectById('5ec4620eb6a35c398e9783cb')
    if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
to_storage = function (creep) {
    var targets = Game.getObjectById('5ec4620eb6a35c398e9783cb')

    if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
find_storage1 = function (creep) {
    var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);

        }
    });

    if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
find_storage1_or_source1 = function (creep) {
    var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);

        }
    });
    if (creep.withdraw(storage[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage[2].store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(storage[2], { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source1(creep)
    }
}
find_storage2_or_source2 = function (creep) {
    var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);

        }
    });
    if (creep.withdraw(storage[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage[1].store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(storage[1], { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,)
    }
}
to_storage1 = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}
to_storage2 = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (targets.length > 0) {
        if (creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffffff' } });
        }
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