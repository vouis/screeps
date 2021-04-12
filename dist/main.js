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
    trans:getBody({ WORK: 7, CARRY: 2, MOVE: 2 }), //300
    carry:getBody({  CARRY: 2, MOVE: 1 }), //300
    base300: getBody({ WORK: 2, CARRY: 1, MOVE: 1 }), //300
    work550: getBody({ WORK: 4, CARRY: 1, MOVE: 1 }), //550
    move550: getBody({ WORK: 1, CARRY: 4, MOVE: 5 }), //550
    base600: getBody({ WORK: 2, CARRY: 3, MOVE: 5 }),//600
    work600: getBody({ WORK: 4, CARRY: 1, MOVE: 3 }), //600
    trans800: getBody({ WORK: 6, CARRY: 0, MOVE: 3 }),//600
    base800: getBody({ WORK: 4, CARRY: 4, MOVE: 4 }),//800
    carry800: getBody({ WORK: 1, CARRY: 8, MOVE: 5 }),//800
    upBu1300: getBody({ WORK: 5, CARRY: 9, MOVE: 7 }),//1300
    walking: getBody({ WORK: 1, CARRY: 19, MOVE: 5 }),//1300
    claim: getBody({ CLAIM: 2, MOVE: 2 }),// 650
    up:getBody({ WORK: 2, CARRY: 1, MOVE: 2 }),
};

// construct
//Game.spawns['Spawn1']
const spawnName = 'Spawn1';
const towerId = '606496df680e4ac68b2d8ccd';
const towerId2 = '606a07304d24f06a9f242bee';
const storageId = '6067b156cea495591213b0ea';
const link2Id = '606bce9496af2a2cda7c90cf';
const linkCenter = '606bd2642bb56187e6ba3e6a';
const linkUpgraderId = '606ff0d769a76c41fb47d1d6';

const controller_North = Game.getObjectById('5bbcad0e9099fc012e6368bd');



const container_1 = '606545e6a4e2a38c708728ed';
const container_2 = '60653e74e6f7f835e1474818';
const container_North = '606fcba3c084396e28cc61a4';

const source_North = '5bbcad0e9099fc012e6368bc';
const source_1 = '5bbcad0e9099fc012e6368bf';
const source_2 = '5bbcad0e9099fc012e6368c0';

const mineral = '5bbcb2e440062e4259e93ea4';
const container_mineral = '6070e8a9a77d0a04a85ff2d2';

const decayTime = 1500;

const find_source = function (creep, sourceId) {
    const source = Game.getObjectById(sourceId);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};
const storageEnough = () =>{
    const storage = Game.getObjectById(storageId);
    if (storage && storage.store[RESOURCE_ENERGY] > 10000){
        return true
    }
    return false;

};

const find_container_trans = function (creep, sourceId, structureId) {
    const source = Game.getObjectById(sourceId);
    const structure = Game.getObjectById(structureId);
    if (structure&&JSON.stringify(structure.pos) !== JSON.stringify(creep.pos)) { // 走到container上面
        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
    } else {
        if (structure&&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
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
    const tower2 = Game.getObjectById(towerId2);
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
    if (tower2 && tower2.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        targets.push(tower2);
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
        return true;
    } else {
        if (isUpgrade) {
            const controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
        }
        return false;
    }
};

const to_destroy_building = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (targets) => targets.hits < targets.hitsMax && targets.structureType !== STRUCTURE_WALL
    });
    targets.sort((a, b) => a.hits - b.hits);
    if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            creep.say('repair');
        }
        return true;
    }
    else {
        return false;
    }
};

const tower_action = function () {
    const tower = Game.getObjectById(towerId);
    const tower2 = Game.getObjectById(towerId2);
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
    if (tower2) {
        const closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower2.attack(closestHostile);
        } else {
            var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
            });
            if (closestDamagedStructure) {
                tower2.repair(closestDamagedStructure);
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
        const linkUpgrader = Game.getObjectById(linkUpgraderId);
        if(linkUpgrader&&linkUpgrader.energy>0){
            if (creep.withdraw(linkUpgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(linkUpgrader, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }else {
            creep.say('等待能量传输!');
            //find_structure_or_source(creep, source_2, container_2, storageId)
        }
    },
    target: creep => {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    },
    switch: creep => creep.updateState()
});

const roleBuilder = () => ({

    source: creep => {
        if(storageEnough()){
            find_structure_or_source(creep, source_2, container_2, storageId);
        }else {
            creep.say('能量不太够!😨');
        }
    },

    target: creep => {
        find_building(creep, true);
    },

    switch: creep => creep.updateState()
});

const roleTransfer= () => ({
    target: creep => {
        find_container_trans(creep,source_1,container_1);
    },
});

const roleTransfer2= () => ({
    source: creep => {
        const source = Game.getObjectById(source_2);
        const structure = Game.getObjectById(container_2);
        if (JSON.stringify(structure.pos) !== JSON.stringify(creep.pos)) { // 走到container上面
            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
        } else if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
            if(source.energy>0){
                creep.harvest(source);
            }else if(structure.store[RESOURCE_ENERGY] != 0){
                creep.withdraw(structure, RESOURCE_ENERGY);
            }
        }
    },
    target: creep => {
        const link = Game.getObjectById(link2Id);

        // if(link.cooldown===0&&link.energy>=600){
        //     link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
        // }
        if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 50) {
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }else {
            if (Game.getObjectById(container_2).store.getFreeCapacity(RESOURCE_ENERGY) > 50) {
                creep.transfer(container_2, RESOURCE_ENERGY);
            }
        }
    },
    switch: creep => creep.updateState()
});

const roleTranstorage = () => ({
    source: creep => {
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (target&&target.energy>250) {
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            find_structure_or_source(creep, source_1, container_1);
        }

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

const northRoomRepair = () => ({
    source: creep => {
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target&&target.energy) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                find_structure_or_source(creep, source_North, container_North);
        }
    },
    target: creep => {
        if (to_destroy_building(creep)) { return; }
        if (find_building(creep, false)) { return; }    },
    switch: creep => creep.updateState(),
    otherRoom:'E2S34'
});

const northRoomCarry = () => ({
    source: creep => {
            find_structure_or_source(creep, source_North, container_North);
    },
    target: creep => {
        // if (find_building(creep, false)) { return; };
        const storage = Game.getObjectById(storageId);
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState(),
    otherRoom:'E2S34'
});

const roleClaimer = () => ({
    target: creep => {
            if (creep.reserveController(controller_North) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_North);
            }

    },
    otherRoom:'E2S34',
});

const roleTransferN = () => ({
    target: creep => {
            find_container_trans(creep, source_North, container_North);
    },
    otherRoom:'E2S34'

});

const roleLink2storage = () => ({
    source: creep => {
        // if(Memory.taskList.length)
        const link = Game.getObjectById(linkCenter);
        if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
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

const miner = () => ({
    source: creep => {
        find_structure_or_source(creep, mineral, container_mineral);
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

const transferMiner= () => ({
    target: creep => {
        find_container_trans(creep,mineral,container_mineral);
    },
});

var creepList = {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: roleUpgrader(),
    // upgrader2: upgrader(),
    // upgrader3: upgrader(),
    // upgrader4: upgrader(),
    builder1: roleBuilder(),
    builder2: roleBuilder(),
    transfer1_1: roleTransfer(),
    transfer2_1: roleTransfer2(),
    transtorage1_1: roleTranstorage(),
    link2Storage: roleLink2storage(),

    // miner
    minerToStorage1:miner(),
    transferMiner:transferMiner(),

    // north room

    northRoomRepair: northRoomRepair(),
    northRoomCarry1: northRoomCarry(),
    northRoomCarry2: northRoomCarry(),
    claimerN: roleClaimer(),
    transferN: roleTransferN(),

    // attack
    // attacker:attacker()

};

// Memory.spawns.Spawn1.spawnList.splice(0,0,'transferMiner')
// Memory.spawns.Spawn1.spawnList.push('harvester2')

// 注意修改其中的 spawn 名称 work550:getBody({WORK:4,CARRY:1,MOVE:1}),
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], 'northRoom2', { memory: { role: 'northRoom2' }})

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'harvester2', { memory: { role: 'harvester2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transfer1_1', { memory: { role: 'transfer1_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK,CARRY,WORK], 'transfer2_1', { memory: { role: 'transfer2_1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE, WORK, WORK,CARRY], 'upgrader1', { memory: { role: 'upgrader1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'upgrader2', { memory: { role: 'upgrader2' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder1', { memory: { role: 'builder1' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'builder2', { memory: { role: 'builder2' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'transtorage1_1', { memory: { role: 'transtorage1_1' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, CARRY, CARRY], 'link2Storage', { memory: { role: 'link2Storage' } })

//Game.spawns.Spawn1.spawnCreep([CLAIM, MOVE], 'claimerN', { memory: { role: 'claimerN' } })
// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transferN', { memory: { role: 'transferN' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomCarry1', { memory: { role: 'northRoomCarry1' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomCarry2', { memory: { role: 'northRoomCarry2' } })
//Game.spawns.Spawn1.spawnCreep([MOVE, WORK, CARRY], 'northRoomRepair', { memory: { role: 'northRoomRepair' } })

//Game.spawns.Spawn1.spawnCreep([MOVE, CLAIM, MOVE,CLAIM], 'attacker', { memory: { role: 'attacker' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'minerToStorage1', { memory: { role: 'minerToStorage1' } })

// Game.spawns.Spawn1.spawnCreep([MOVE, WORK], 'transferMiner', { memory: { role: 'transferMiner' } })

// 引入 creep 配置项

Creep.prototype.work = function() {
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
        if (creepConfig.target&&creepConfig.otherRoom){
            this.avoid(creepConfig.otherRoom,creepConfig.target);
        }
        else {creepConfig.target(this);}
    }
    else {
        if (creepConfig.source&&creepConfig.otherRoom){
            this.avoid(creepConfig.otherRoom,creepConfig.source);
        }else {
            creepConfig.source(this);
        }
    }
};

Creep.prototype.avoid = function(roomString,fn){
    const room = Game.rooms[roomString];
    if (!Memory.invader) {
        Memory.invader = {};
        Memory.invader[roomString] = 0;
    }
    if (room && room.find(FIND_HOSTILE_CREEPS).length) { // 遇到invader计时，往出生点跑
        if (Memory.invader[roomString] + decayTime < Game.time) { //不在侵略时间段，记录开始时间
            Memory.invader[roomString] = Game.time;
        }
        this.moveTo(new RoomPosition(9, 2, 'E2S35'));
    } else if (Memory.invader[roomString] + decayTime > Game.time) { //在侵略时间段
        this.moveTo(new RoomPosition(9, 2, 'E2S35'));
    }
    else if (!room && Memory.invader[roomString] + decayTime < Game.time) { //没视野，不被侵略
        this.moveTo(new RoomPosition(20, 36, roomString));
    } else if (Memory.invader[roomString] + decayTime < Game.time) { //当前不在侵略时间段
        fn(this);
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

    // 去重
    for(let existName in Memory.creeps){
        if(taskName===existName){
            return this.memory.spawnList.length
        }
    }

    // 额外自动添加creep


    // 外矿claimer生成时间控制,每个CLAIM大概500次,5000为上限，时间够了不生成
    if(taskName.includes('claimer')&&controller_North.reservation){
        //Game.getObjectById('5bbcad0e9099fc012e6368bd').reservation.ticksToEnd
        if(controller_North.reservation.ticksToEnd > 3000){
            return;
        }
    }else {
        let hasClaimer = false;
        // 没有claimer时，生成
        for(let existName in Memory.creeps){
            if('claimerN'===existName){
                hasClaimer=true;
            }
        }
        if(this.memory.spawnList.find(e=>e==='claimerN')){
            hasClaimer=true;
        }

        if(!hasClaimer&&(!controller_North.reservation||controller_North.reservation.ticksToEnd < 1000)){
            this.memory.spawnList.push('claimerN');
        }
    }

    // 优先级处理
    if(taskName.includes('harvester')){
        if (this.spawning){
            this.memory.spawnList.splice(1, 0, taskName);
        }else {
            this.memory.spawnList.splice(0, 0, taskName);
        }
    }else {
        this.memory.spawnList.push(taskName);
    }
    return this.memory.spawnList.length
};

Spawn.prototype.mainSpawn = function (taskName) {
    let newBody = body.upBu1300;
    if (taskName.includes('transtorage') || taskName.includes('northRoomCarry')) {
        newBody = body.walking;
    }
    if (taskName.includes('harvester')||taskName.includes('minerToStorage')) {
        newBody = body.carry800;
    }
    else if (taskName.includes('transfer')) {
        newBody = body.trans;
    }
    else if (taskName.includes('claimer')||taskName.includes('attacker')) {
        newBody = body.claim;
    }
    else if(taskName.includes('link2Storage')){
        newBody = body.carry;
    }else if(taskName.includes('upgrader')){
        newBody = body.up;
    }
    // upgrader,builder
    const value = Game.spawns.Spawn1.spawnCreep(newBody, taskName, { memory: { role: taskName } });
    if (value === 0) return true
    return false
};

StructureLink.prototype.work = function(){

    if (this.cooldown != 0) return

    if (this.store.getUsedCapacity(RESOURCE_ENERGY) < 700) return
    if(!this.room.memory.sourceLink2Id){
        this.room.memory.sourceLink2Id='606bce9496af2a2cda7c90cf';
    }

    // 发送给 upgrader 和center
    if (this.room.memory.sourceLink2Id&& this.room.memory.sourceLink2Id === this.id) {
        const link = Game.getObjectById(this.room.memory.sourceLink2Id);
        const linkUpgrader = Game.getObjectById(linkUpgraderId);
        if(link.cooldown===0) {
            if (storageEnough() && linkUpgrader.energy <100) {
                link.transferEnergy(linkUpgrader, 700);
            } else {
                link.transferEnergy(Game.getObjectById(linkCenter), link.energy);
            }
        }

    }

};

function stateScanner () {
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

    if (Game.cpu.bucket > 6000) {
        Game.cpu.generatePixel();
    }

    if (!Memory.taskList) Memory.taskList = [];

}

var createCreeps = function (role, type) {
    Game.spawns[spawnName].spawnCreep(body[type], role,
        { memory: { role: role } });
};


module.exports.loop = function () {
    // 统计全局资源使用
    stateScanner();
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
                    delete Memory.creeps[name];
                    Game.spawns[spawnName].addTask(name);
                }
            }
                delete Memory.creeps[name];
        }
    }

    Game.spawns[spawnName].work();

    for (const name in Game.structures) {
        const structures = Game.structures[name];
        if(structures.structureType ==STRUCTURE_LINK){
            structures.work();
        }
    }

    if(Game.spawns[spawnName].hits<2500){
        Game.rooms['E2S35'].controller.activateSafeMode();
    }

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
