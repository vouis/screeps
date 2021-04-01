import {
    controller_North
} from "../global";

const roleClaimer= () => ({
    target: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(20, 36, 'E2S34'))
        }
        else{
            if(creep.reserveController(controller_North) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_North);
            }
        }
    }
})

export default roleClaimer;