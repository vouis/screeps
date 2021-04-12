import {linkCenter, linkUpgraderId, storageId,storageEnough} from "../../global";

StructureLink.prototype.work = function(){

    if (this.cooldown != 0) return

    if (this.store.getUsedCapacity(RESOURCE_ENERGY) < 700) return
    if(!this.room.memory.sourceLink2Id){
        this.room.memory.sourceLink2Id='606bce9496af2a2cda7c90cf'
    }

    // 发送给 upgrader 和center
    if (this.room.memory.sourceLink2Id&& this.room.memory.sourceLink2Id === this.id) {
        const link = Game.getObjectById(this.room.memory.sourceLink2Id)
        const linkUpgrader = Game.getObjectById(linkUpgraderId)
        if(link.cooldown===0) {
            // if (storageEnough() && linkUpgrader.energy <100) {
                if (0) {
                link.transferEnergy(linkUpgrader, 700);
            } else {
                let linkTask = {
                    from:linkCenter,
                    to:storageId,
                    resourceType:RESOURCE_ENERGY,
                    amount:Math.min(link.energy,Game.getObjectById(linkCenter).store.getFreeCapacity(RESOURCE_ENERGY)),
                }
                Memory.taskList.Spawn1.push(linkTask)
                link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
            }
        }

    }

}