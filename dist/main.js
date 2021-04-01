'use strict';

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
    while(body.CLAIM){
        newBody.push(CLAIM);
        body.CLAIM--;
    }
    return newBody
};

const roles = {
    harvester: {number:0,type:'move550'},
    tranfer: {number:0,type:'work550'},
    tranfer2: {number:0,type:'work550'},
    repairer: {number:0,type:'base300'},
    upgrader: {number:0,type:'move550'},
    builder: {number:0,type:'move550'},
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
    base:getBody({WORK:1,CARRY:1,MOVE:1}), //200
    base300:getBody({WORK:2,CARRY:1,MOVE:1}), //300
    work550:getBody({WORK:4,CARRY:1,MOVE:1}), //550
    move550:getBody({WORK:1,CARRY:4,MOVE:5}), //550
    base600:getBody({WORK:2,CARRY:3,MOVE:5}),//600
    trans600:getBody({WORK:5,CARRY:1,MOVE:1}),//600
    work: getBody({WORK:5,CARRY:1,MOVE:5}),
    move: getBody({WORK:1,CARRY:6,MOVE:7}),
    average: getBody({WORK:3,CARRY:4,MOVE:6}),
};

// construct
const spawnName = 'Spawn1';
const tower =Game.getObjectById('606496df680e4ac68b2d8ccd');
const storage =Game.getObjectById('5ec4620eb6a35c398e9783cb');



const container_1 = Game.getObjectById('606545e6a4e2a38c708728ed');
const container_2 = Game.getObjectById('60653e74e6f7f835e1474818');

const source_North = Game.getObjectById('5bbcad0e9099fc012e6368bc');
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

const moveto_Target$1 = function (creep) {
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
    }else {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
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
    moveto_Target$1(creep);
    }
};

const harvester= () => ({
    source: creep => {
        find_structure_or_source(creep, source_1, container_1);
    },
    target: creep => {
        moveto_Target$1(creep);
    },
    switch: creep => creep.updateState()
});

const roleUpgrader$1= () => ({
    source: creep => {
        find_structure_or_source(creep,source_2,container_2);
    },
    target: creep => {
        const controller = creep.room.controller;
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller);
    },
    switch: creep => creep.updateState()
});

const roleBuilder$1= () => ({
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
    source: creep => {
        find_source(creep,source_1);
    },
    target: creep => {
        to_structure(creep,container_1);
    },
    switch: creep => creep.updateState()
});

const roleTransfer2= () => ({
    source: creep => {
        find_source(creep,source_2);
    },
    target: creep => {
        to_structure(creep,container_2);
    },
    switch: creep => creep.updateState()
});

const otherRoom= () => ({
    source: creep => {
        const room = Game.rooms['E2S34'];
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'));
        }
        else {
            find_structure_or_source(creep, source_North, null);
        }
    },
    target: creep => {
        find_building(creep);
        //to_structure(creep,container_1)
    },
    switch: creep => creep.updateState()
});

var creepConfigs = {
    harvester1: harvester(),
    harvester2: harvester(),
    upgrader1: roleUpgrader$1(),
    upgrader2:roleUpgrader$1(),
    builder1:roleBuilder$1(),
    builder2:roleBuilder$1(),
    transfer1_1:roleTransfer(),
    transfer1_2:roleTransfer(),
    transfer2_1:roleTransfer2(),
    transfer2_2:roleTransfer2(),
    otherRoom1:otherRoom(),
    otherRoom2:otherRoom(),
};

// 注意修改其中的 spawn 名称
// Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], 'otherRoom1', { memory: { role: 'otherRoom1' }})

// 引入 creep 配置项

Creep.prototype.work = function()
{
    // 检查 creep 内存中的角色是否存在
    if (!(this.memory.role in creepConfigs)) {
        console.log(`creep ${this.name} 内存属性 role 不属于任何已存在的 creepConfigs 名称`);
        return
    }
    // 获取对应配置项
    const creepConfig = creepConfigs[this.memory.role];

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

Spawn.prototype.work = function() {
    // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
    if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return
    // 进行生成
    const spawnSuccess = this.mainSpawn(this.memory.spawnList[0]);
    // 生成成功后移除任务
    if (spawnSuccess) this.memory.spawnList.shift();
};


Spawn.prototype.addTask = function(taskName) {
    // 任务加入队列
    if(this.memory.spawnList===undefined){
        this.memory.spawnList = [];
    }
    this.memory.spawnList.push(taskName);
    return this.memory.spawnList.length
};

Spawn.prototype.mainSpawn = function(taskName) {
   let newBody = body.base600;
    if(taskName.includes('harvester')||taskName.includes('upgrader')){
        newBody = body.move550;
    }
    else if(taskName.includes('transfer')){
        newBody = body.trans600;
    }
    const value = Game.spawns.Spawn1.spawnCreep(newBody, taskName, { memory: { role: taskName }});
    if(value===0) return true
    return false
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

const getName = (role) =>{
    return role + Game.time;
};

var createCreeps = function (role,type) {
    Game.spawns[spawnName].spawnCreep(body[type], getName(role),
        { memory: { role: role } });
};


module.exports.loop = function () {
    var role = {
        total: _.filter(Game.creeps),
        harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'||creep.memory.role == 'harvester1'||creep.memory.role == 'harvester2'),
        builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'||creep.memory.role == 'builder1'||creep.memory.role == 'builder2'),
        upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'||creep.memory.role == 'upgrader1'||creep.memory.role == 'upgrader2'),
        tranfer: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer'||creep.memory.role == 'transfer1_1'||creep.memory.role == 'transfer1_2'
            ||creep.memory.role == 'transfer2_1'||creep.memory.role == 'transfer2_2'),
        tranfer2: _.filter(Game.creeps, (creep) => creep.memory.role == 'tranfer2'),
        repairer: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    };
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            if(name==='harvester1'||name==='harvester2'||name === 'upgrader1'
                ||name === 'upgrader2'||name === 'builder1'||name === 'builder2'
            ||name==='transfer1_1'||name === 'transfer1_2'
                ||name==='transfer2_1'||name === 'transfer2_2'
                ||name==='otherRoom1'||name === 'otherRoom2'){
                Game.spawns[spawnName].addTask(name);
                delete Memory.creeps[name];
                return;
            }
            delete Memory.creeps[name];
        }
    }

    Game.spawns[spawnName].work();

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
        if(creep.memory.role == 'harvester1'||creep.memory.role == 'harvester2'
            ||creep.memory.role == 'upgrader1'||creep.memory.role == 'upgrader2'
            ||creep.memory.role == 'builder1'||creep.memory.role == 'builder2'
        ||creep.memory.role == 'transfer1_1'||creep.memory.role == 'transfer1_2'
            ||creep.memory.role == 'transfer2_1'||creep.memory.role == 'transfer2_2'
        ||creep.memory.role == 'otherRoom1'||creep.memory.role == 'otherRoom2'){
            creep.work();
        }
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
