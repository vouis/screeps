import {
    controller_North,
    towerId,
    decayTime
} from "../global";


const roleClaimer = () => ({
    target: creep => {
            if (creep.reserveController(controller_North) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_North);
            }

    },
    otherRoom:'E2S34',
})

export default roleClaimer;