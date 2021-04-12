// 引入 creep 配置项
import creepConfigs from '../config.creep.js'
import {decayTime, linkCenter, storageId} from "../global";

Creep.prototype.work = function() {
    // 检查 creep 内存中的角色是否存在
    if (!(this.memory.role in creepConfigs)) {
        console.log(`creep ${this.name} 内存属性 role 不属于任何已存在的 creepConfigs 名称`)
        return
    }
    // 获取对应配置项
    const creepConfig = creepConfigs[this.memory.role]

    // 获取是否工作
    const working = creepConfig.switch ? creepConfig.switch(this) : true

    if(this.memory.role==='link2Storage'){
        let myTask = null;
        if(!myTask&&Memory.taskList.Spawn1.length){
            myTask = Memory.taskList.Spawn1.shift()
        }
        console.log('myTask',myTask)

        // let linkTask = {
        //     from:linkCenter,
        //     to:storageId,
        //     resourceType:RESOURCE_ENERGY,
        // }
        if(myTask){
            // 执行对应操作
            if (working) {
                if (creepConfig.target&&creepConfig.otherRoom){
                    this.avoid(creepConfig.otherRoom,creepConfig.target)
                }
                else {creepConfig.target(this,myTask.to,myTask.resourceType)}
            }
            else {
                if (creepConfig.source&&creepConfig.otherRoom){
                    this.avoid(creepConfig.otherRoom,creepConfig.source)
                }else{
                    creepConfig.source(this,myTask.from,myTask.resourceType)
                }
            }
        }


    }else{
        // 执行对应操作
        if (working) {
            if (creepConfig.target&&creepConfig.otherRoom){
                this.avoid(creepConfig.otherRoom,creepConfig.target)
            }
            else {creepConfig.target(this)}
        }
        else {
            if (creepConfig.source&&creepConfig.otherRoom){
                this.avoid(creepConfig.otherRoom,creepConfig.source)
            }else{
                creepConfig.source(this)
            }
        }
    }
}

Creep.prototype.avoid = function(roomString,fn){
    const room = Game.rooms[roomString]
    if (!Memory.invader) {
        Memory.invader = {};
        Memory.invader[roomString] = 0
    }
    if (room && room.find(FIND_HOSTILE_CREEPS).length) { // 遇到invader计时，往出生点跑
        if (Memory.invader[roomString] + decayTime < Game.time) { //不在侵略时间段，记录开始时间
            Memory.invader[roomString] = Game.time;
        }
        this.moveTo(new RoomPosition(9, 2, 'E2S35'))
    } else if (Memory.invader[roomString] + decayTime > Game.time) { //在侵略时间段
        this.moveTo(new RoomPosition(9, 2, 'E2S35'))
    }
    else if (!room && Memory.invader[roomString] + decayTime < Game.time) { //没视野，不被侵略
        this.moveTo(new RoomPosition(20, 36, roomString))
    } else if (Memory.invader[roomString] + decayTime < Game.time) { //当前不在侵略时间段
        fn(this)
    }

}

Creep.prototype.updateState = function(resourceType=RESOURCE_ENERGY)
{
    // creep 身上没有能量 && creep 之前的状态为“工作”
    if(this.store[resourceType] <= 0 && this.memory.working) {
        this.memory.working = false
    }
    // creep 身上能量满了 && creep 之前的状态为“不工作”
    if(this.store[resourceType] >= this.store.getCapacity() && !this.memory.working) {
        this.memory.working = true
    }

    return this.memory.working
}
