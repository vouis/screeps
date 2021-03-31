/**
 * 升级者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到指定的 roomController 中
 *
 * @param sourceId 要挖的矿 id
 */
const roleTest= sourceId => ({
    // 采集能量矿
    source: creep => {
        const source = Game.getObjectById(sourceId)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
    },
    // 升级控制器
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})

export default roleTest;