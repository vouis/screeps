import { container_1, find_structure_or_source, source_1, storageId } from "../global";

const roleTranstorage = () => ({
    source: creep => {
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (target) {
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            find_structure_or_source(creep, source_1, container_1)
        }

    },
    target: creep => {
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default roleTranstorage;