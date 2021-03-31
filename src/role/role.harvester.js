import {container_1, find_structure_or_source, source_1, storage, tower} from "../global";

const moveto_Target = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (tower && tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(tower)
    }
    if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(storage)
    }
    if (targets.length > 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}

const harvester= () => ({
    source: creep => {
        find_structure_or_source(creep, source_1, container_1)
    },
    target: creep => {
        moveto_Target(creep);
    },
    switch: creep => creep.updateState()
})

export default harvester;