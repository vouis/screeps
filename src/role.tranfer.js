import {find_source,to_structure,source_1, container_1} from './global'
var roleTranfer = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source(creep,source_1)
        }
        else {
            to_structure(creep,container_1)
        }
    }
};

export default roleTranfer;