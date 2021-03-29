var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTranfer = require('role.tranfer');
var roleTranfer2 = require('role.tranfer2');
var roleRepairer = require('role.repairer');
var global = require('global');

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
    return newBody
}

var body = {
    base:getBody({WORK:1,CARRY:1,MOVE:1}),
    work: getBody({WORK:5,CARRY:1,MOVE:5}),
    move: getBody({WORK:1,CARRY:6,MOVE:7}),
    average: getBody({WORK:3,CARRY:4,MOVE:6})
}
const getName = (role) =>{
    return role + Game.time;
}

var createCreeps = function (role,type) {
    Game.spawns[spawnName].spawnCreep(body[type], getName(role),
        { memory: { role: role } });
}

var roles = {
    harvesters: {number:2,type:'base'},
    tranfers: {number:0,type:'base'},
    tranfer2s: {number:2,type:'base'},
    repairers: {number:0,type:'base'},
    builders: {number:2,type:'base'},
    upgraders: {number:0,type:'base'}

}

if(mode === 'base'){
    roles = {
        harvesters: {number:2,type:'base'},
        tranfers: {number:0,type:'base'},
        tranfer2s: {number:0,type:'base'},
        repairers: {number:0,type:'base'},
        builders: {number:2,type:'base'},
        upgraders: {number:2,type:'base'}
    }
}

module.exports.loop = function () {
    var role = {
        total: _.filter(Game.creeps),
        harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
        builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
        upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
        tranfers: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer'),
        tranfer2s: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

        if (role.total.length < 2) {
            console.log('Spawning new harvester: ');
            createCreeps('harvester',roles.harvesters.type)
        }
        for(let i in roles){
            if(role[i].length<roles[i].number){
                console.log(role[i].length, 'Spawning new ',i);
                createCreeps(i,roles[i].type)
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
            if (roles.builders.number == 0) { creep.memory.role = "upgrader" }
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
}
