import {
    container_mineral,
    find_container_trans,
    mineral,
} from "../../global";

const transferMiner= () => ({
    target: creep => {
        find_container_trans(creep,mineral,container_mineral,RESOURCE_OXYGEN)
    },
})

export default transferMiner;