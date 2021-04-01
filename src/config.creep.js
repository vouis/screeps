import harvester from './role/role.harvester'
import upgrader from './role/role.upgrader'
import builder from './role/role.builder'
import transfer from './role/role.transfer'
import transfer2 from './role/role.transfer2'
import otherRoom from './role/role.otherRoom'
import claimer from './role/role.claimer'
import transferN from './role/role.otherRoomTransfer'
export default {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: upgrader(),
    upgrader2:upgrader(),
    builder1:builder(),
    builder2:builder(),
    transfer1_1:transfer(),
    // transfer1_2:transfer(),
    transfer2_1:transfer2(),
    // transfer2_2:transfer2(),
    // north room
    otherRoom1:otherRoom(),
    otherRoom2:otherRoom(),
    claimer1:claimer(),
    transferN1:transferN()

}

// 注意修改其中的 spawn 名称 work550:getBody({WORK:4,CARRY:1,MOVE:1}),
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], 'transferN1', { memory: { role: 'transferN1' }})