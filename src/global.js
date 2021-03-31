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
    harvester: {number:2,type:'move550'},
    tranfer: {number:0,type:'work550'},
    tranfer2: {number:0,type:'work550'},
    repairer: {number:1,type:'base300'},
    upgrader: {number:2,type:'move550'},
    builder: {number:4,type:'move550'},
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
    base550:getBody({WORK:3,CARRY:3,MOVE:2}), //550
    work550:getBody({WORK:4,CARRY:1,MOVE:1}), //550
    move550:getBody({WORK:1,CARRY:4,MOVE:5}), //550
    work: getBody({WORK:5,CARRY:1,MOVE:5}),
    move: getBody({WORK:1,CARRY:6,MOVE:7}),
    average: getBody({WORK:3,CARRY:4,MOVE:6}),
}

// construct
export const spawnName = 'Spawn1'
export const tower =Game.getObjectById('5ec293036612cd7d2564f3c3') || null
export const storage =Game.getObjectById('5ec4620eb6a35c398e9783cb') || null
export const mode = 'base'

export const container_spawn=Game.getObjectById('60619e848532e078ac6919d2')
export const container_1 = Game.getObjectById('6061fc9bc5078b66d847289b')
export const container_2 = Game.getObjectById('6061f1ee5e99e45a74b56875')

export const source_1 = Game.getObjectById('5bbcad0e9099fc012e6368bf')
export const source_2 = Game.getObjectById('5bbcad0e9099fc012e6368c0')

export const find_source = function (creep,source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}
export const find_structure= function (creep,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

export const find_structure_or_source = function (creep,source,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,source)
    }
}

export const to_structure = function (creep,structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        }
}

export const find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        return 0;
    }
}