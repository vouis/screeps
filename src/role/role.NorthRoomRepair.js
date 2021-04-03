import {
    find_building,
    find_structure_or_source,
    to_destroy_building,
    source_North,
    container_North,
    storageId,
} from "../global";

const northRoomRepair = () => ({
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
    },
    switch: creep => creep.updateState()
})

export default northRoomRepair;