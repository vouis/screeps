import harvester from './role/role.harvester'
import upgrader from './role/role.upgrader'
import builder from './role/role.builder'
import transfer from './role/role.transfer'
import transfer2 from './role/role.transfer2'
import otherRoom from './role/role.otherRoom'
export default {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: upgrader(),
    upgrader2:upgrader(),
    builder1:builder(),
    builder2:builder(),
    transfer1_1:transfer(),
    transfer1_2:transfer(),
    transfer2_1:transfer2(),
    transfer2_2:transfer2(),
    otherRoom1:otherRoom(),
    otherRoom2:otherRoom(),
}

// 注意修改其中的 spawn 名称
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], 'otherRoom1', { memory: { role: 'otherRoom1' }})