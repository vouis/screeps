import {container_mineral, find_structure_or_source, mineral, storageId} from "../../global";



const miner = () => ({
    source: creep => {
        find_structure_or_source(creep, mineral, container_mineral,null,RESOURCE_OXYGEN)
    },
    target: creep => {
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_OXYGEN) > 0) {
            if (creep.transfer(storage, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default miner;