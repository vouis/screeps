import {container_1, find_building, find_structure_or_source, source_1} from "../global";

const roleTest= () => ({
    // 采集能量矿
    source: creep => {
        find_structure_or_source(creep,source_1,container_1)
    },
    // 升级控制器
    target: creep => {
        find_building(creep);
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})

export default roleTest;