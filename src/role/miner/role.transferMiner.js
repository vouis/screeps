import {
    container_mineral,
    find_container_trans,
    mineral,
} from "../../global";

const roleTransfer= () => ({
    target: creep => {
        find_container_trans(creep,mineral,container_mineral)
    },
})

export default roleTransfer;