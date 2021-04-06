StructureLink.prototype.work = function(){
    if (this.cooldown != 0) return

    // 检查内存字段来决定要执行哪种职责的工作
    if (this.room.memory.centerLinkId && this.room.memory.centerLinkId === this.id) this.centerWork()
    // else if (this.room.memory.upgradeLinkId && this.room.memory.upgradeLinkId === this.id) this.upgradeWork()
    else this.sourceWork()
}

StructureLink.prototype.sourceWork= function(){
    if (this.store.getUsedCapacity(RESOURCE_ENERGY) < 700) return

    // 发送给 center link
    if (this.room.memory.centerLinkId) {
        const centerLink = this.getLinkByMemoryKey('centerLinkId')
        if (!centerLink || centerLink.store[RESOURCE_ENERGY] >= 799) return

        this.transferEnergy(centerLink)
    }
}