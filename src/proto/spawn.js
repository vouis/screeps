import { body } from '../global';

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
        console.log(existName)
        if(taskName===existName){
            return this.memory.spawnList.length
        }
    }



    // 优先级处理
    if(taskName.includes('harvester')){
        this.memory.spawnList.splice(0, 0, taskName)
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
    if (taskName.includes('harvester')) {
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
    }
    // upgrader,builder
    const value = Game.spawns.Spawn1.spawnCreep(newBody, taskName, { memory: { role: taskName } })
    if (value === 0) return true
    return false
}