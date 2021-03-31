// 引入 creep 配置项
import creepConfigs from 'config.creep.js'

Creep.prototype.describe_self = function()
{
    this.say('I\'m '+this.name)
}

Creep.prototype.work = function()
{
    // 检查 creep 内存中的角色是否存在
    if (!(this.memory.role in creepConfigs)) {
        console.log(`creep ${this.name} 内存属性 role 不属于任何已存在的 creepConfigs 名称`)
        return
    }
    // 获取对应配置项
    const creepConfig = creepConfigs[this.memory.role]

    // 获取是否工作
    const working = creepConfig.switch ? creepConfig.switch(this) : true

    // 执行对应操作
    if (working) {
        if (creepConfig.target) creepConfig.target(this)
    }
    else {
        if (creepConfig.source) creepConfig.source(this)
    }
}

Creep.prototype.updateState = function()
{
    // creep 身上没有能量 && creep 之前的状态为“工作”
    if(this.store[RESOURCE_ENERGY] <= 0 && this.memory.working) {
        this.memory.working = false
        this.say('执行 source 阶段')
    }
    // creep 身上能量满了 && creep 之前的状态为“不工作”
    if(this.store[RESOURCE_ENERGY] >= this.store.getCapacity() && !this.memory.working) {
        this.memory.working = true
        this.say('执行 target 阶段')
    }

    return this.memory.working
}
