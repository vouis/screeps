import {
    link2Id,
    linkCenter,
    container_2,
    find_container_trans, find_structure_or_source, source_1,
    source_2, storageId,
} from "../global";

const roleTransfer2= () => ({
    source: creep => {
        const source = Game.getObjectById(source_2);
        const structure = Game.getObjectById(container_2);
        if (JSON.stringify(structure.pos) !== JSON.stringify(creep.pos)) { // 走到container上面
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        } else if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
            if(source.energy>0){
                creep.harvest(source)
            }else if(structure.store[RESOURCE_ENERGY] != 0){
                creep.withdraw(structure, RESOURCE_ENERGY)
            }
        }
    },
    target: creep => {
        const link = Game.getObjectById(link2Id)

        if(link.cooldown===0&&link.energy>=600){
            link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
        }
        if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 50) {
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }else{
            if (Game.getObjectById(container_2).store.getFreeCapacity(RESOURCE_ENERGY) > 50) {
                creep.transfer(container_2, RESOURCE_ENERGY)
            }
        }
    },
    switch: creep => creep.updateState()
})

export default roleTransfer2;