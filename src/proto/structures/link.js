import {linkCenter} from "../../global";

StructureLink.prototype.work = function(){
    if (this.cooldown != 0) return

    if (this.store.getUsedCapacity(RESOURCE_ENERGY) < 700) return
    if(!this.room.memory.sourceLink2Id){
        this.room.memory.sourceLink2Id='606bce9496af2a2cda7c90cf'
    }

    // 发送给 upgrader 和center
    if (this.room.memory.sourceLink2Id&& this.room.memory.sourceLink2Id === this.id) {
        const link = Game.getObjectById(this.room.memory.sourceLink2Id)
        if(link.cooldown===0){
            link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
        }
    }

}