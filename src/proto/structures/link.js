import {linkCenter, linkUpgraderId, storageId} from "../../global";

StructureLink.prototype.work = function(){

    if (this.cooldown != 0) return

    if (this.store.getUsedCapacity(RESOURCE_ENERGY) < 700) return
    if(!this.room.memory.sourceLink2Id){
        this.room.memory.sourceLink2Id='606bce9496af2a2cda7c90cf'
    }

    // 发送给 upgrader 和center
    if (this.room.memory.sourceLink2Id&& this.room.memory.sourceLink2Id === this.id) {
        const storage = Game.getObjectById(storageId)
        const link = Game.getObjectById(this.room.memory.sourceLink2Id)
        const linkUpgrader = Game.getObjectById(linkUpgraderId)
        if(link.cooldown===0) {
            if (storage && storage.energy < 10000 || linkUpgrader.energy > 100) {
                    link.transferEnergy(Game.getObjectById(linkCenter), link.energy);

            } else {
                    link.transferEnergy(linkUpgrader, link.energy);
            }
        }

    }

}