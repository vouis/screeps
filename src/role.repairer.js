import {find_structure_or_source,source_1, container_1,to_destroy_building} from './global'

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
            to_destroy_building(creep)
        }
        else {
            find_structure_or_source(creep,source_1,container_1)
        }

    }
};

export default roleRepairer;