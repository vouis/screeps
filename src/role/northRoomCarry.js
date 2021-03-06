import {
    find_building,
    find_structure_or_source,
    source_North,
    container_North,
    storageId,
    decayTime,
} from "../global";

const northRoomCarry = () => ({
    source: creep => {
            find_structure_or_source(creep, source_North, container_North)
    },
    target: creep => {
        // if (find_building(creep, false)) { return; };
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState(),
    otherRoom:'E2S34'
})

export default northRoomCarry;