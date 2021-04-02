import {
    container_1,
    find_container_trans,
    source_1,
} from "../global";

const roleTransfer= () => ({
    target: creep => {
        find_container_trans(creep,source_1,container_1)
    },
})

export default roleTransfer;