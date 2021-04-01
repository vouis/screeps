import {container_2, find_structure_or_source, source_2} from "../global";

const roleUpgrader= sourceId => ({
    // 采集能量矿
    source: creep => {
        find_structure_or_source(creep,source_2,container_2)
    },
    // 升级控制器
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})

export default roleUpgrader;