import { container_2, find_structure_or_source, source_2, storageId } from "../global";

const roleTranstorage = () => ({
    source: creep => {
        find_structure_or_source(creep, source_2, container_2)
    },
    target: creep => {
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },
    switch: creep => creep.updateState()
})

export default roleTranstorage;