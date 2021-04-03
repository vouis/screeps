import {
    find_container_trans,
    container_North,
    source_North,
} from "../global";

const roleTransferN = () => ({
    target: creep => {
        find_container_trans(creep, source_North, container_North)
    },

})

export default roleTransferN;