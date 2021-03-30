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