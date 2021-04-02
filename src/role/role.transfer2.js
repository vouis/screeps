import {
    container_2,
    find_container_trans,
    source_2,
} from "../global";

const roleTransfer2= () => ({
    target: creep => {
        find_container_trans(creep,source_2,container_2)
    },
    switch: creep => creep.updateState()
})

export default roleTransfer2;