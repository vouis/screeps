import {
    container_1,
    find_source,
    source_1,
    to_structure
} from "../global";

const roleTransfer= () => ({
    source: creep => {
        find_source(creep,source_1)
    },
    target: creep => {
        to_structure(creep,container_1)
    },
    switch: creep => creep.updateState()
})

export default roleTransfer;