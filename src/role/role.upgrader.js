import { container_2, find_structure_or_source, source_2, storageId } from "../global";

const roleUpgrader = () => ({
    source: creep => {
        find_structure_or_source(creep, source_2, container_2, storageId)
    },
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    },
    switch: creep => creep.updateState()
})

export default roleUpgrader;