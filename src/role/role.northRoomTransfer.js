import {
    find_container_trans,
    container_North,
    source_North,
    decayTime, find_building,
} from "../global";

const roleTransferN = () => ({
    target: creep => {
        if (find_building(creep, false)) { return; };
            find_container_trans(creep, source_North, container_North)
    },
    otherRoom:'E2S34'

})

export default roleTransferN;