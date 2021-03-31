import {find_building,find_structure_or_source} from './global'
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
            find_structure_or_source(creep,source_2,container_2)

        }
    }
};

export default roleBuilder;