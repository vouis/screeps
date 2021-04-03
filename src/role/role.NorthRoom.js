import {
    find_building,
    find_structure_or_source,
    to_destroy_building,
    source_North,
    container_North,
    storageId,
} from "../global";

const NorthRoom = () => ({
    source: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'))
        }
        else {
            find_structure_or_source(creep, source_North, container_North)
        }
    },
    target: creep => {
        if (to_destroy_building(creep)) { return; }
        if (find_building(creep, false)) { return; };
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default NorthRoom;