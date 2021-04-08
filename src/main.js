import { spawnName, tower_action, roles, body } from './global'
import './proto/creep'
import './proto/spawn'
import creepList from './config.creep'
import stateScanner from './stateScanner/index'


const getName = (role) => {
    return role + Game.time;
}

var createCreeps = function (role, type) {
    Game.spawns[spawnName].spawnCreep(body[type], role,
        { memory: { role: role } });
}


module.exports.loop = function () {
    // 统计全局资源使用
    stateScanner()
    var role = {
        total: _.filter(Game.creeps),
        harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' || creep.memory.role == 'harvester1' || creep.memory.role == 'harvester2'),
        builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' || creep.memory.role == 'builder1' || creep.memory.role == 'builder2'),
        upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' || creep.memory.role == 'upgrader1' || creep.memory.role == 'upgrader2'),
        tranfer: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer' || creep.memory.role == 'transfer1_1' || creep.memory.role == 'transfer1_2'
            || creep.memory.role == 'transfer2_1' || creep.memory.role == 'transfer2_2'),
        tranfer2: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairer: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            for (let key in creepList) {
                if (name === key) {
                    Game.spawns[spawnName].addTask(name);
                }
            }
            delete Memory.creeps[name];
        }
    }

    Game.spawns[spawnName].work();

    if(Game.spawns[spawnName].hits<2500){
        Game.rooms['E2S35'].controller.activateSafeMode();
    }

    if (role.harvester.length < 1) {
        console.log('Spawning new harvester: ');
        createCreeps('harvester1', 'base')
    }
    for (let i in roles) {
        if (role[i].length < roles[i].number) {
            console.log(role[i].length, 'Spawning new ', i);
            createCreeps(i, roles[i].type)
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

    tower_action()

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        creep.work();
    }
}
