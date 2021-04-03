'use strict';

const getBody = (body) => {
    const newBody = [];
    while (body.WORK) {
        newBody.push(WORK);
        body.WORK--;
    }
    while (body.CARRY) {
        newBody.push(CARRY);
        body.CARRY--;
    }
    while (body.MOVE) {
        newBody.push(MOVE);
        body.MOVE--;
    }
    while (body.CLAIM) {
        newBody.push(CLAIM);
        body.CLAIM--;
    }
    return newBody
};

const roles = {
    harvester: { number: 0, type: 'move550' },
    tranfer: { number: 0, type: 'work550' },
    tranfer2: { number: 0, type: 'work550' },
    repairer: { number: 0, type: 'base300' },
    upgrader: { number: 0, type: 'move550' },
    builder: { number: 0, type: 'move550' },
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
const body = {
    base: getBody({ WORK: 1, CARRY: 1, MOVE: 1 }), //200
    base300: getBody({ WORK: 2, CARRY: 1, MOVE: 1 }), //300
    work550: getBody({ WORK: 4, CARRY: 1, MOVE: 1 }), //550
    move550: getBody({ WORK: 1, CARRY: 4, MOVE: 5 }), //550
    base600: getBody({ WORK: 2, CARRY: 3, MOVE: 5 }),//600
    work600: getBody({ WORK: 4, CARRY: 1, MOVE: 3 }), //600
    trans800: getBody({ WORK: 6, CARRY: 0, MOVE: 3 }),//600
    base800: getBody({ WORK: 4, CARRY: 4, MOVE: 4 }),//800
    carry800: getBody({ WORK: 1, CARRY: 8, MOVE: 5 }),//800
    claim: getBody({ CLAIM: 1, MOVE: 1 }),// 650
};

// construct
const spawnName = 'Spawn1';
const towerId = '606496df680e4ac68b2d8ccd';
const storageId = '6067b156cea495591213b0ea';

Game.getObjectById('5bbcad0e9099fc012e6368bd');



const container_1 = '606545e6a4e2a38c708728ed';
const container_2 = '60653e74e6f7f835e1474818';
const source_1 = '5bbcad0e9099fc012e6368bf';
const source_2 = '5bbcad0e9099fc012e6368c0';

const find_source = function (creep, sourceId) {
    const source = Game.getObjectById(sourceId);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};

const find_container_trans = function (creep, sourceId, structureId) {
    const source = Game.getObjectById(sourceId);
    const structure = Game.getObjectById(structureId);
    if (JSON.stringify(structure.pos) !== JSON.stringify(creep.pos) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
    } else {
        if (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creep.harvest(source);
        }

    }
};

const find_structure_or_source = function (creep, sourceId, structureId1, structureId2) {
    const structure1 = Game.getObjectById(structureId1);
    const structure2 = Game.getObjectById(structureId2);
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(structure1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure1.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure1, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (source.energy) {
        find_source(creep, sourceId);
    }
    else if (structure2 && creep.withdraw(structure2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure2.store[RESOURCE_ENERGY] != 0) {
        creep.moveTo(structure2, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};

const moveto_Target = function (creep) {
    const tower = Game.getObjectById(towerId);
    const storage = Game.getObjectById(storageId);
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
    } else {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    }
};

const find_building = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    }
};

const tower_action = function () {
    const tower = Game.getObjectById(towerId);
    if (tower) {
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        } else {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }

    }
};

const harvester = () => ({
    source: creep => {
        find_structure_or_source(creep, source_1, container_1, storageId);
    },
    target: creep => {
        moveto_Target(creep);
    },
    switch: creep => creep.updateState()
});

const roleUpgrader = () => ({
    source: creep => {
        find_structure_or_source(creep, source_2, container_2);
    },
    target: creep => {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    },
    switch: creep => creep.updateState()
});

const roleBuilder= () => ({
    // 采集能量矿
    source: creep => {
        find_structure_or_source(creep,source_2,container_2);
    },
    // 升级控制器
    target: creep => {
        find_building(creep);
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
});

const roleTransfer= () => ({
    target: creep => {
        find_container_trans(creep,source_1,container_1);
    },
});

const roleTransfer2= () => ({
    target: creep => {
        find_container_trans(creep,source_2,container_2);
    },
    switch: creep => creep.updateState()
});

const roleTranstorage = () => ({
    source: creep => {
        find_structure_or_source(creep, source_2, container_2);
    },
    target: creep => {
        const storage = Game.getObjectById(storageId);
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
});

var creepList = {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: roleUpgrader(),
    upgrader2: roleUpgrader(),
    upgrader3: roleUpgrader(),
    upgrader4: roleUpgrader(),
    builder1: roleBuilder(),
    builder2: roleBuilder(),
    transfer1_1: roleTransfer(),
    transfer2_1: roleTransfer2(),
    transtorage1: roleTranstorage(),
    // north room
    // otherRoom1:otherRoom(),
    // otherRoom2:otherRoom(),
    // claimer1:claimer(),
    // transferN1:transferN()

};

// 注意修改其中的 spawn 名称 work550:getBody({WORK:4,CARRY:1,MOVE:1}),
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], 'transferN1', { memory: { role: 'transferN1' }})

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'harvester2', { memory: { role: 'harvester2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer1_1', { memory: { role: 'transfer1_1' } })


// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer2_1', { memory: { role: 'transfer2_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader1', { memory: { role: 'upgrader1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader2', { memory: { role: 'upgrader2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder1', { memory: { role: 'builder1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder2', { memory: { role: 'builder2' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'transtorage1', { memory: { role: 'transtorage1' } })

// 引入 creep 配置项

Creep.prototype.work = function()
{
    // 检查 creep 内存中的角色是否存在
    if (!(this.memory.role in creepList)) {
        console.log(`creep ${this.name} 内存属性 role 不属于任何已存在的 creepConfigs 名称`);
        return
    }
    // 获取对应配置项
    const creepConfig = creepList[this.memory.role];

    // 获取是否工作
    const working = creepConfig.switch ? creepConfig.switch(this) : true;

    // 执行对应操作
    if (working) {
        if (creepConfig.target) creepConfig.target(this);
    }
    else {
        if (creepConfig.source) creepConfig.source(this);
    }
};

Creep.prototype.updateState = function()
{
    // creep 身上没有能量 && creep 之前的状态为“工作”
    if(this.store[RESOURCE_ENERGY] <= 0 && this.memory.working) {
        this.memory.working = false;
    }
    // creep 身上能量满了 && creep 之前的状态为“不工作”
    if(this.store[RESOURCE_ENERGY] >= this.store.getCapacity() && !this.memory.working) {
        this.memory.working = true;
    }

    return this.memory.working
};

Spawn.prototype.work = function () {
    // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
    if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return
    // 进行生成
    const spawnSuccess = this.mainSpawn(this.memory.spawnList[0]);
    // 生成成功后移除任务
    if (spawnSuccess) this.memory.spawnList.shift();
};


Spawn.prototype.addTask = function (taskName) {
    // 任务加入队列
    if (this.memory.spawnList === undefined) {
        this.memory.spawnList = [];
    }
    this.memory.spawnList.push(taskName);
    return this.memory.spawnList.length
};

Spawn.prototype.mainSpawn = function (taskName) {
    let newBody = body.base800;
    if (taskName.includes('harvester')) {
        newBody = body.carry800;
    }
    else if (taskName.includes('trans')) {
        newBody = body.trans800;
    }
    else if (taskName.includes('claimer')) {
        newBody = body.claim;
    }
    // upgrader,builder
    const value = Game.spawns.Spawn1.spawnCreep(newBody, taskName, { memory: { role: taskName } });
    if (value === 0) return true
    return false
};

var createCreeps = function (role, type) {
    Game.spawns[spawnName].spawnCreep(body[type], role,
        { memory: { role: role } });
};


module.exports.loop = function () {
    var role = {
        total: _.filter(Game.creeps),
        harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' || creep.memory.role == 'harvester1' || creep.memory.role == 'harvester2'),
        builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' || creep.memory.role == 'builder1' || creep.memory.role == 'builder2'),
        upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' || creep.memory.role == 'upgrader1' || creep.memory.role == 'upgrader2'),
        tranfer: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer' || creep.memory.role == 'transfer1_1' || creep.memory.role == 'transfer1_2'
            || creep.memory.role == 'transfer2_1' || creep.memory.role == 'transfer2_2'),
        tranfer2: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairer: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    };
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

    if (role.harvester.length < 1) {
        console.log('Spawning new harvester: ');
        createCreeps('harvester1', 'base');
    }
    for (let i in roles) {
        if (role[i].length < roles[i].number) {
            console.log(role[i].length, 'Spawning new ', i);
            createCreeps(i, roles[i].type);
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

    tower_action();

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        creep.work();
    }
};
//# sourceMappingURL=main.js.map
