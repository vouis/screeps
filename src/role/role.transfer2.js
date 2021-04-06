import {
    link2Id,
    linkCenter,
    container_2,
    find_container_trans, find_structure_or_source, source_1,
    source_2, storageId,
} from "../global";

const roleTransfer2= () => ({
    source: creep => {
        find_container_trans(creep,source_2,container_2)

    },
    target: creep => {
        const link = Game.getObjectById(link2Id)

        if(link.cooldown===0&&link.energy>=700){
            link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
        }
        if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default roleTransfer2;