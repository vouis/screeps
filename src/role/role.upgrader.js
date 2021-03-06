import { container_2, find_structure_or_source, source_2, storageId,linkUpgraderId,find_source } from "../global";

const roleUpgrader = () => ({
    source: creep => {
        const linkUpgrader = Game.getObjectById(linkUpgraderId)
        if(linkUpgrader&&linkUpgrader.energy>0){
            if (creep.withdraw(linkUpgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(linkUpgrader, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }else{
            creep.say('等待能量传输!');
            //find_structure_or_source(creep, source_2, container_2, storageId)
        }
    },
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    },
    switch: creep => creep.updateState()
})

export default roleUpgrader;