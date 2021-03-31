import {spawnName,tower,roles,body} from './global'
import './creep'
import './proto/spawn'
import roleHarvester  from './role.harvester'
import roleUpgrader  from './role.upgrader'
import roleBuilder  from './role.builder'
import roleTranfer  from './role.tranfer'
import roleTranfer2  from './role.tranfer2'
import roleRepairer  from './role.repairer'


const getName = (role) =>{
    return role + Game.time;
}

var createCreeps = function (role,type) {
    Game.spawns[spawnName].spawnCreep(body[type], getName(role),
        { memory: { role: role } });
}


module.exports.loop = function () {
    var role = {
        total: _.filter(Game.creeps),
        harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
        builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
        upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
        tranfer: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer'),
        tranfer2: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairer: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log(name);
            if(name==='harvester1'||name==='harvester2'){
                // 重生
                console.log(name);
                const spawnLength = Game.spawns[spawnName].addTask(name);
                delete Memory.creeps[name];
                console.log('当前队列',spawnLength);
                return;
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    console.log(Game.spawns[spawnName])
    Game.spawns[spawnName].work();

    if (role.harvester.length < 1) {
        console.log('Spawning new harvester: ');
        createCreeps('harvester','base')
    }
    for(let i in roles){
        if(role[i].length<roles[i].number){
            console.log(role[i].length, 'Spawning new ',i);
            createCreeps(i,roles[i].type)
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
        if(creep.memory.role == 'harvester1'||creep.memory.role == 'harvester2'){
            creep.work()
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            if (roles.builder.number == 0) { creep.memory.role = "upgrader" }
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
