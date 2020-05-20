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

var creatbig = function (newName, role) {
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
        { memory: { role: role } });
}
var hcreep = function (newName, role) {
    Game.spawns['Spawn1'].spawnCreep(body.movee, newName,
        { memory: { role: role } });
}
var tranfercreep = function (newName, role) {
    Game.spawns['Spawn1'].spawnCreep(body.work, newName,
        { memory: { role: role } });
}
var avercreep = function (newName, role) {
    Game.spawns['Spawn1'].spawnCreep(body.average, newName,
        { memory: { role: role } });
}

var numbers = {
    harvesters: 3,
    tranfers: 2,
    tranfer2s: 2,
    repairers: 0,
    builders: 0,
    upgraders: 7

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
    if (role.total.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body.little, newName,
            { memory: { role: 'harvester' } });

    }
    else if (role.harvesters.length < numbers.harvesters) {
        var newName = 'Harvester' + Game.time;
        console.log(role.harvesters.length, 'Spawning new harvester: ' + newName);
        hcreep(newName, 'harvester');
    }
    else if (role.tranfers.length < numbers.tranfers) {
        var newName = 'Tranfer' + Game.time;
        console.log(role.tranfers.length, 'Spawning new Tranfer: ' + newName);
        tranfercreep(newName, 'tranfer');
    }
    else if (role.tranfer2s.length < numbers.tranfer2s) {
        var newName = 'Tranfer2' + Game.time;
        console.log(role.tranfer2s.length, 'Spawning new Tranfer2: ' + newName);
        tranfercreep(newName, 'tranfer2');
    }

    else if (role.repairers.length < numbers.repairers) {
        var newName = 'repairer' + Game.time;
        console.log(role.repairers.length, 'Spawning new repairer: ' + newName);
        creatbig(newName, 'repairer');
    }

    else if (role.builders.length < numbers.builders) {
        var newName = 'builders' + Game.time;
        console.log(role.builders.length, 'Spawning new builder: ' + newName);
        // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
        //     {memory: {role: 'builder'}});
        avercreep(newName, 'builder');
    }
    else if (role.upgraders.length < numbers.upgraders) {
        var newName = 'upgrader' + Game.time;
        console.log(role.upgraders.length, 'Spawning new upgrader: ' + newName);
        avercreep(newName, 'upgrader');
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    var tower = Game.getObjectById('5ec293036612cd7d2564f3c3');
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
