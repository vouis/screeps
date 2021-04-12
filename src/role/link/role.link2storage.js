import {storageId, linkCenter} from "../../global";

const roleLink2storage = () => ({
    source: (creep,from) => {
        const link = Game.getObjectById(from)
        if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    target: (creep,to) => {
        const storage = Game.getObjectById(to)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default roleLink2storage;