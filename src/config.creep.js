import roleTest from './role/role.taskTest';
import harvester from './role/role.harvester'
export default {
    // roleTest1: roleTest('5bbcad0e9099fc012e6368bf')
    harvester1: harvester()
}

// 注意修改其中的 spawn 名称
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'roleTest1', { memory: { role: 'roleTest1' }})
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'harvester1', { memory: { role: 'harvester1' }})