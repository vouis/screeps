const getBody = (body) =>{
    const newBody = []
    while(body.WORK){
        newBody.push(WORK)
        body.WORK--;
    }
    while(body.CARRY){
        newBody.push(CARRY)
        body.CARRY--;
    }
    while(body.MOVE){
        newBody.push(MOVE)
        body.MOVE--;
    }
    while(body.CLAIM){
        newBody.push(CLAIM)
        body.CLAIM--;
    }
    return newBody
}

export const roles = {
    harvester: {number:0,type:'move550'},
    tranfer: {number:0,type:'work550'},
    tranfer2: {number:0,type:'work550'},
    repairer: {number:0,type:'base300'},
    upgrader: {number:0,type:'move550'},
    builder: {number:0,type:'move550'},
};
// BODYPART_COST: {
//     "move": 50,
//         "work": 100,
//         "attack": 80,
//         "carry": 50,
//         "heal": 250,
//         "ranged_attack": 150,
//         "tough": 10,
//         "claim": 600
// },
export const body = {
    base:getBody({WORK:1,CARRY:1,MOVE:1}), //200
    base300:getBody({WORK:2,CARRY:1,MOVE:1}), //300
    work550:getBody({WORK:4,CARRY:1,MOVE:1}), //550
    move550:getBody({WORK:1,CARRY:4,MOVE:5}), //550
    base600:getBody({WORK:2,CARRY:3,MOVE:5}),//600
    work600:getBody({WORK:4,CARRY:1,MOVE:3}), //600
    trans800:getBody({WORK:6,CARRY:0,MOVE:3}),//600
    base800:getBody({WORK:4,CARRY:4,MOVE:4}),//800
    carry800:getBody({WORK:1,CARRY:8,MOVE:5}),//800
    claim:getBody({CLAIM:1,MOVE:1}),// 650
}

// construct
export const spawnName = 'Spawn1'
export const towerId ='606496df680e4ac68b2d8ccd'
export const storage =null

export const controller_North = Game.getObjectById('5bbcad0e9099fc012e6368bd')



export const container_1 = '606545e6a4e2a38c708728ed'
export const container_2 = '60653e74e6f7f835e1474818'
export const container_North = null

export const source_North = '5bbcad0e9099fc012e6368bc'
export const source_1 = '5bbcad0e9099fc012e6368bf'
export const source_2 = '5bbcad0e9099fc012e6368c0'

export const find_source = function (creep,sourceId) {
    const source = Game.getObjectById(sourceId);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

export const find_container_trans = function (creep,sourceId,structureId) {
    const source = Game.getObjectById(sourceId);
    const structure = Game.getObjectById(structureId);
    if (JSON.stringify(structure.pos)!==JSON.stringify(creep.pos)&&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
    }else{
        creep.harvest(source)

    }
}

export const find_structure= function (creep,structure) {
    if (creep.withdraw(Game.getObjectById(structure), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(structure), { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

export const find_structure_or_source = function (creep,sourceId,structureId) {
    const structure = Game.getObjectById(structureId);
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,sourceId)
    }
}

export const moveto_Target = function (creep) {
    const tower = Game.getObjectById(towerId)
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (tower && tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(tower)
    }
    if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(storage)
    }
    if (targets.length > 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }else{
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    }
}

export const to_structure = function (creep,structureId) {
    const structure = Game.getObjectById(structureId);
        if (JSON.stringify(structure.pos)!==JSON.stringify(creep.pos)&&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        }else{
            creep.transfer(structure, RESOURCE_ENERGY)
        }
}

export const find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)
    }
}

export const to_destroy_building = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (targets) => targets.hits < targets.hitsMax
    });
    targets.sort((a, b) => a.hits - b.hits);
    if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            creep.say('repair');
        }
    }
}

export const tower_action = function(){
    const tower = Game.getObjectById(towerId)
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax&&structure.structureType !== STRUCTURE_WALL
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
}
