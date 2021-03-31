import {find_source,to_structure,source_2, container_2} from './global'
var roleTranfer2 = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source(creep,source_2)
        }
        else {
            to_structure(creep,container_2)
        }
    }
};

export default roleTranfer2;