import harvester from './role/role.harvester'
import upgrader from './role/role.upgrader'
import builder from './role/role.builder'
export default {
    // roleTest1: roleTest('5bbcad0e9099fc012e6368bf')
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: upgrader(),
    upgrader2:upgrader(),
    builder1:builder(),
    builder2:builder()
}

// 注意修改其中的 spawn 名称
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'roleTest1', { memory: { role: 'roleTest1' }})
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'upgrader2', { memory: { role: 'upgrader2' }})