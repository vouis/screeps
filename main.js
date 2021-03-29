var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTranfer = require('role.tranfer');
var roleTranfer2 = require('role.tranfer2');
var roleRepairer = require('role.repairer');
var body = {
    little: [WORK, CARRY, MOVE],
    work: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    movee: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    average: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
}
const getName = (role) =>{
    return role + Game.time;
}

var createBaseCreeps = function (role) {
    Game.spawns[spawnName].spawnCreep(body.little, getName(role),
        { memory: { role: role } });
}


var creatbig = function (role) {
    Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], getName(role),
        { memory: { role: role } });
}
var hcreep = function (role) {
    Game.spawns[spawnName].spawnCreep(body.movee, getName(role),
        { memory: { role: role } });
}

var tranfercreep = function (role) {
    Game.spawns[spawnName].spawnCreep(body.work, getName(role),
        { memory: { role: role } });
}
var avercreep = function (role) {
    Game.spawns[spawnName].spawnCreep(body.average, getName(role),
        { memory: { role: role } });
}

var numbers = {
    harvesters: 3,
    tranfers: 2,
    tranfer2s: 0,
    repairers: 0,
    builders: 0,
    upgraders: 0

}

module.exports.loop = function () {

    // Memory = JSON.parse(RawMemory.get());
    // Memory.number = {
    //     harvesters: 3,
    //     tranfers: 2,
    //     tranfer2s: 2,
    //     repairers: 0,
    //     builders: 0,
    //     upgraders: 7
    // }
    // RawMemory.set(JSON.stringify(Memory));
    // console.log(Memory.number)


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
    if(mode==='base'){
        if (role.total.length < 2) {
            console.log('Spawning new harvester: ');
            createBaseCreeps('harvester')
        }

        else if( role.total.length < 4){
            console.log(role.tranfers.length, 'Spawning new Tranfer: ' );
            createBaseCreeps('upgrader');
        }else if(role.total.length < 6){
            console.log(role.builders.length, 'Spawning new builder: ' );
            createBaseCreeps('builder');
        }
    }else{
        if (role.total.length < 2) {
            console.log('Spawning new harvester: ');
            createBaseCreeps('harvester')
        }
    else if (role.harvesters.length < numbers.harvesters) {
            console.log(role.harvesters.length, 'Spawning new harvester: ' );
            hcreep('harvester');
        }
        else if (role.tranfers.length < numbers.tranfers) {
            console.log(role.tranfers.length, 'Spawning new Tranfer: ');
            tranfercreep('tranfer');
        }
        else if (role.tranfer2s.length < numbers.tranfer2s) {
            console.log(role.tranfer2s.length, 'Spawning new Tranfer2: ');
            tranfercreep( 'tranfer2');
        }

        else if (role.repairers.length < numbers.repairers) {
            console.log(role.repairers.length, 'Spawning new repairer: ');
            creatbig( 'repairer');
        }

        else if (role.builders.length < numbers.builders) {
            console.log(role.builders.length, 'Spawning new builder: ' );
            // Game.spawns[spawnName].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            //     {memory: {role: 'builder'}});
            avercreep('builder');
        }
        else if (role.upgraders.length < numbers.upgraders) {
            console.log(role.upgraders.length, 'Spawning new upgrader: ');
            avercreep( 'upgrader');
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
            if (Memory.number.builders == 0) { creep.memory.role = "upgrader" }
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
