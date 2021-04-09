import harvester from './role/role.harvester'
import upgrader from './role/role.upgrader'
import builder from './role/role.builder'
import transfer from './role/role.transfer'
import transfer2 from './role/link/role.transfer2'
import transtorage from './role/role.transtorage'
import transtorage2 from './role/role.transtorage2'
import northRoomRepair from './role/role.NorthRoomRepair'
import northRoomCarry from './role/northRoomCarry'
import claimer from './role/role.claimer'
import transferN from './role/role.northRoomTransfer'
import attacker from './role/attack/role.attack'
import roleLink2storage from './role/link/role.link2storage'
import miner from './role/miner/role.miner'
import transferMiner from './role/miner/role.transferMiner'
export default {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: upgrader(),
    // upgrader2: upgrader(),
    // upgrader3: upgrader(),
    // upgrader4: upgrader(),
    builder1: builder(),
    builder2: builder(),
    transfer1_1: transfer(),
    transfer2_1: transfer2(),
    transtorage1_1: transtorage(),
    link2Storage: roleLink2storage(),

    // miner
    // miner1:miner(),
    // transferMiner:transferMiner(),

    // north room

    northRoomRepair: northRoomRepair(),
    northRoomCarry1: northRoomCarry(),
    northRoomCarry2: northRoomCarry(),
    claimerN: claimer(),
    transferN: transferN(),

    // attack
    // attacker:attacker()

}

// 注意修改其中的 spawn 名称 work550:getBody({WORK:4,CARRY:1,MOVE:1}),
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], 'northRoom2', { memory: { role: 'northRoom2' }})

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'harvester2', { memory: { role: 'harvester2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer1_1', { memory: { role: 'transfer1_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK,CARRY,WORK], 'transfer2_1', { memory: { role: 'transfer2_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader1', { memory: { role: 'upgrader1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader2', { memory: { role: 'upgrader2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder1', { memory: { role: 'builder1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder2', { memory: { role: 'builder2' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'transtorage1_1', { memory: { role: 'transtorage1_1' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, CARRY, CARRY], 'link2Storage', { memory: { role: 'link2Storage' } })

//Game.spawns.Spawn1.spawnCreep([CLAIM, MOVE], 'claimerN', { memory: { role: 'claimerN' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transferN', { memory: { role: 'transferN' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomCarry1', { memory: { role: 'northRoomCarry1' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomCarry2', { memory: { role: 'northRoomCarry2' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomRepair', { memory: { role: 'northRoomRepair' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, CLAIM, MOVE,CLAIM], 'attacker', { memory: { role: 'attacker' } })

