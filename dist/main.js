'use strict';

// construct
const spawnName = 'Spawn1';
const tower =Game.getObjectById('5ec293036612cd7d2564f3c3') || null;
const storage =Game.getObjectById('5ec4620eb6a35c398e9783cb') || null;

Game.getObjectById('60619e848532e078ac6919d2');
const container_1 = Game.getObjectById('6061fc9bc5078b66d847289b');
const container_2 = Game.getObjectById('6061f1ee5e99e45a74b56875');

const source_1 = Game.getObjectById('5bbcad0e9099fc012e6368bf');
const source_2 = Game.getObjectById('5bbcad0e9099fc012e6368c0');

const find_source = function (creep,source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};

const find_structure_or_source = function (creep,source,structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
        find_source(creep,source);
    }
};

const to_structure = function (creep,structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        }
};

const find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        return 0;
    }
};

Creep.prototype.describe_self = function()
{
    this.say('I\'m '+this.name);
};

const moveto_Target = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (tower && tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(tower);
    }
    if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(storage);
    }
    if (targets.length > 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};
const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 H: Hrv');
        } else if (!creep.memory.harvesting && creep.carry.energy < creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('🔄 H: Hrv');
        } else if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
            creep.say('🚧 harvest');
        }

        if (creep.memory.harvesting) {
            moveto_Target(creep);
        } else {
            find_structure_or_source(creep, source_1, container_1);
        }
    }
};

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading= false;
            creep.say('🔄 U: Hrv');
        }
        else if (!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            creep.memory.upgrading = false;
            creep.say('🔄 U: Hrv');
        }
        else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('🚧 upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            find_structure_or_source(creep,source_2,container_2);
        }
    }
};

var roleBuilder = {
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 B: Hrv');
        }
        else if (!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
            creep.memory.building = false;
            creep.say('🔄 B: Hrv');
        }
        else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            let status = find_building(creep);
            if (status == 0)
                console.log(Memory.number.builders = 0);
        }
        else {
            find_structure_or_source(creep,source_2,container_2);

        }
    }
};

var roleTranfer = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source(creep,source_1);
        }
        else {
            to_structure(creep,container_1);
        }
    }
};

var roleTranfer2 = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source(creep,source_2);
        }
        else {
            to_structure(creep,container_2);
        }
    }
};

const to_destroy_building = function (creep) {
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
};

var roleRepairer = {
    run: function (creep) {
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 R: Hrv');
        }
        else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            creep.memory.repairing = false;
            creep.say('🔄 R: Hrv');
        }
        else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            to_destroy_building(creep);
        }
        else {
            find_structure_or_source(creep,source_1,container_1);
        }

    }
};

const getBody = (body) =>{
    const newBody = [];
    while(body.WORK){
        newBody.push(WORK);
        body.WORK--;
    }
    while(body.CARRY){
        newBody.push(CARRY);
        body.CARRY--;
    }
    while(body.MOVE){
        newBody.push(MOVE);
        body.MOVE--;
    }
    return newBody
};

var body = {
    base:getBody({WORK:1,CARRY:1,MOVE:1}), //200
    base300:getBody({WORK:2,CARRY:1,MOVE:1}), //300
    base550:getBody({WORK:3,CARRY:3,MOVE:2}), //550
    work550:getBody({WORK:4,CARRY:1,MOVE:1}), //550
    move550:getBody({WORK:1,CARRY:4,MOVE:5}), //550
    work: getBody({WORK:5,CARRY:1,MOVE:5}),
    move: getBody({WORK:1,CARRY:6,MOVE:7}),
    average: getBody({WORK:3,CARRY:4,MOVE:6})
};
const getName = (role) =>{
    return role + Game.time;
};

var createCreeps = function (role,type) {
    Game.spawns[spawnName].spawnCreep(body[type], getName(role),
        { memory: { role: role } });
};

var roles = {
    harvester: {number:2,type:'move550'},
    tranfer: {number:0,type:'work550'},
    tranfer2: {number:0,type:'work550'},
    repairer: {number:1,type:'base550'},
    upgrader: {number:3,type:'move550'},
    builder: {number:0,type:'base300'},

};

module.exports.loop = function () {
    var role = {
        total: _.filter(Game.creeps),
        harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
        builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
        upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
        tranfer: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer'),
        tranfer2: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairer: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    };
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (role.harvester.length < 1) {
        console.log('Spawning new harvester: ');
        createCreeps('harvester','base');
    }
    for(let i in roles){
        if(role[i].length<roles[i].number){
            console.log(role[i].length, 'Spawning new ',i);
            createCreeps(i,roles[i].type);
            break;
        }
    }



    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            if (roles.builder.number == 0) { creep.memory.role = "upgrader"; }
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'tranfer') {
            roleTranfer.run(creep);
        }
        if (creep.memory.role == 'tranfer2') {
            roleTranfer2.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
};
//# sourceMappingURL=main.js.map
