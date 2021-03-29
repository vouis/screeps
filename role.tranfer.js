var roleTranfer = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source1(creep)
        }
        else {
            to_storage1(creep)
        }
    }
};

module.exports = roleTranfer;