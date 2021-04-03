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
    claim: getBody({ CLAIM: 2, MOVE: 2 }),// 650
};

// construct
const spawnName = 'Spawn1';
const towerId = '606496df680e4ac68b2d8ccd';
const storageId = '6067b156cea495591213b0ea';

const controller_North = Game.getObjectById('5bbcad0e9099fc012e6368bd');



const container_1 = '606545e6a4e2a38c708728ed';
const container_2 = '60653e74e6f7f835e1474818';
const container_North = '60686fec1e82527a381169e0';

const source_North = '5bbcad0e9099fc012e6368bc';
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

const find_structure_or_source = function (creep, sourceId, structureId, storageId) {
    const structure = Game.getObjectById(structureId);
    const storage = Game.getObjectById(storageId);
    const source = Game.getObjectById(sourceId);
    if (storage && creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage.store[RESOURCE_ENERGY] != 0) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
    else if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && structure.store[RESOURCE_ENERGY] != 0) {

        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (source.energy) {
        find_source(creep, sourceId);
    }
};

const moveto_Target = function (creep) {
    const tower = Game.getObjectById(towerId);
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
    if (targets.length > 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};

const find_building = function (creep, isUpgrade) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        if (isUpgrade) {
            const controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
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
        find_structure_or_source(creep, source_2, container_2, storageId);
    },
    target: creep => {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    },
    switch: creep => creep.updateState()
});

const roleBuilder = () => ({

    source: creep => {
        find_structure_or_source(creep, source_2, container_2, storageId);
    },

    target: creep => {
        find_building(creep, true);
    },

    switch: creep => creep.updateState()
});

const roleTransfer = () => ({
    target: creep => {
        find_container_trans(creep, source_1, container_1);
    },
});

const roleTransfer2 = () => ({
    target: creep => {
        find_container_trans(creep, source_2, container_2);
    },
    switch: creep => creep.updateState()
});

const roleTranstorage = () => ({
    source: creep => {
        find_structure_or_source(creep, source_1, container_1);
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

const roleTranstorage2 = () => ({
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

const NorthRoom = () => ({
    source: creep => {
        const room = Game.rooms['E2S34'];
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'));
        }
        else {
            find_structure_or_source(creep, source_North, container_North);
        }
    },
    target: creep => {
        to_destroy_building(creep);
        find_building(creep, false);
    },
    switch: creep => creep.updateState()
});

const roleClaimer = () => ({
    target: creep => {
        const room = Game.rooms['E2S34'];
        if (!room) {
            creep.moveTo(new RoomPosition(20, 36, 'E2S34'));
        }
        else {
            if (creep.reserveController(controller_North) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_North);
            }
        }
    }
});

const roleTransferN = () => ({
    target: creep => {
        find_container_trans(creep, source_North, container_North);
    },

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
    transtorage1_1: roleTranstorage(),
    transtorage2_1: roleTranstorage2(),
    // north room
    northRoom1: NorthRoom(),
    northRoom2: NorthRoom(),
    claimerN: roleClaimer(),
    transferN: roleTransferN()

};

// 注意修改其中的 spawn 名称 work550:getBody({WORK:4,CARRY:1,MOVE:1}),
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], 'northRoom2', { memory: { role: 'northRoom2' }})

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'harvester2', { memory: { role: 'harvester2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer1_1', { memory: { role: 'transfer1_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer2_1', { memory: { role: 'transfer2_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader1', { memory: { role: 'upgrader1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader2', { memory: { role: 'upgrader2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder1', { memory: { role: 'builder1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder2', { memory: { role: 'builder2' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'transtorage1_1', { memory: { role: 'transtorage1_1' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'transtorage2_1', { memory: { role: 'transtorage2_1' } })

//Game.spawns.Spawn1.spawnCreep([CLAIM, CLAIM, MOVE,MOVE], 'claimerN', { memory: { role: 'claimerN' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transferN', { memory: { role: 'transferN' } })

// 引入 creep 配置项

Creep.prototype.work = function () {
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

Creep.prototype.updateState = function () {
    // creep 身上没有能量 && creep 之前的状态为“工作”
    if (this.store[RESOURCE_ENERGY] <= 0 && this.memory.working) {
        this.memory.working = false;
    }
    // creep 身上能量满了 && creep 之前的状态为“不工作”
    if (this.store[RESOURCE_ENERGY] >= this.store.getCapacity() && !this.memory.working) {
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
    else if (taskName.includes('transfer')) {
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

function stateScanner() {
    // 每 20 tick 运行一次
    if (Game.time % 20) return

    if (!Memory.stats) Memory.stats = {};

    // 统计 GCL / GPL 的升级百分比和等级
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
    Memory.stats.gclLevel = Game.gcl.level;
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100;
    Memory.stats.gplLevel = Game.gpl.level;
    // CPU 的当前使用量
    Memory.stats.cpu = Game.cpu.getUsed();
    // bucket 当前剩余量
    Memory.stats.bucket = Game.cpu.bucket;
}

var createCreeps = function (role, type) {
    Game.spawns[spawnName].spawnCreep(body[type], role,
        { memory: { role: role } });
};


module.exports.loop = function () {
    // 统计全局资源使用
    stateScanner();
    if (Game.cpu.bucket > 6000) {
        Game.cpu.generatePixel();
    }
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
