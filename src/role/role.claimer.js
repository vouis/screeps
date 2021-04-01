import {
    container_1,
    find_source,
    source_1,
    to_structure
} from "../global";

const roleClaimer= () => ({
    target: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(20, 36, 'E2S34'))
        }
        else{
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
})

export default roleClaimer;