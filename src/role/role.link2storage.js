import {storageId, linkCenter} from "../global";

const roleTranstorage2 = () => ({
    source: creep => {
        const link = Game.getObjectById(linkCenter)
        if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && link.store[RESOURCE_ENERGY] != 0) {
            creep.moveTo(link, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    target: creep => {
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default roleTranstorage2;