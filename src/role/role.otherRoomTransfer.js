import {
    container_North,
    find_source, find_structure_or_source,
    source_North,
    to_structure
} from "../global";

const roleTransferN= () => ({
    source: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'))
        }
        else{
            find_source(creep,source_North)
        }
    },
    target: creep => {
        to_structure(creep,container_North)
    },
    switch: creep => creep.updateState()
})

export default roleTransferN;