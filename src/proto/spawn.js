import { body,controller_North } from '../global';

Spawn.prototype.work = function () {
    // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
    if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return
    // 进行生成
    const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
    // 生成成功后移除任务
    if (spawnSuccess) this.memory.spawnList.shift()
}


Spawn.prototype.addTask = function (taskName) {
    // 任务加入队列
    if (this.memory.spawnList === undefined) {
        this.memory.spawnList = []
    }

    // 去重
    for(let existName in Memory.creeps){
        if(taskName===existName){
            return this.memory.spawnList.length
        }
    }

    // 额外自动添加creep


    // 外矿claimer生成时间控制,每个CLAIM大概500次,5000为上限，时间够了不生成
    if(taskName.includes('claimer')&&controller_North.reservation){
        //Game.getObjectById('5bbcad0e9099fc012e6368bd').reservation.ticksToEnd
        if(controller_North.reservation.ticksToEnd > 3000){
            return;
        }
    }else{
        let hasClaimer = false
        // 没有claimer时，生成
        for(let existName in Memory.creeps){
            if('claimerN'===existName){
                hasClaimer=true
            }
        }
        if(this.memory.spawnList.find(e=>e==='claimerN')){
            hasClaimer=true
        }

        if(!hasClaimer&&(!controller_North.reservation||controller_North.reservation.ticksToEnd < 1000)){
            this.memory.spawnList.push('claimerN')
        }
    }

    // 优先级处理
    if(taskName.includes('harvester')){
        if (this.spawning){
            this.memory.spawnList.splice(1, 0, taskName)
        }else{
            this.memory.spawnList.splice(0, 0, taskName)
        }
    }else{
        this.memory.spawnList.push(taskName)
    }
    return this.memory.spawnList.length
}

Spawn.prototype.mainSpawn = function (taskName) {
    let newBody = body.upBu1300;
    if (taskName.includes('transtorage') || taskName.includes('northRoomCarry')) {
        newBody = body.walking
    }
    if (taskName.includes('harvester')||taskName.includes('minerToStorage')) {
        newBody = body.carry800
    }
    else if (taskName.includes('transfer')) {
        newBody = body.trans
    }
    else if (taskName.includes('claimer')||taskName.includes('attacker')) {
        newBody = body.claim
    }
    else if(taskName.includes('link2Storage')){
        newBody = body.carry
    }else if(taskName.includes('upgrader')){
        newBody = body.up
    }
    // upgrader,builder
    const value = Game.spawns.Spawn1.spawnCreep(newBody, taskName, { memory: { role: taskName } })
    if (value === 0) return true
    return false
}