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
                console.log(Memory.number.builders = 0)
        }
        else {
            //find_source2(creep);
            //find_storage1_or_source1(creep)
            find_storage2_or_source2(creep)

        }
    }
};

module.exports = roleBuilder;