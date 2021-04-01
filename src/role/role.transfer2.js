import {
    container_2,
    find_source,
    source_2,
    to_structure
} from "../global";

const roleTransfer2= () => ({
    source: creep => {
        find_source(creep,source_2)
    },
    target: creep => {
        to_structure(creep,container_2)
    },
    switch: creep => creep.updateState()
})

export default roleTransfer2;