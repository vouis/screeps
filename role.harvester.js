moveto_Target = function (creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    var tower = Game.getObjectById('5ec293036612cd7d2564f3c3')
    var storage =Game.getObjectById('5ec4620eb6a35c398e9783cb')
    if(tower&&tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
    {
    targets.push(tower)}
    if(storage&&storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
    {
    targets.push(storage)}
  console.log(targets)
    if (targets.length > 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 H: Hrv');
        }
        else if (!creep.memory.harvesting && creep.carry.energy < creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('🔄 H: Hrv');
        }
        else if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
            creep.say('🚧 harvest');
        }

        if (creep.memory.harvesting) {
            moveto_Target(creep);
        }
        else {
            find_storage1_or_source1(creep);
            //find_source1(creep);
        }
    }
};

module.exports = roleHarvester;
