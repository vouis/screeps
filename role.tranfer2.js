var roleTranfer2 = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            find_source2(creep)
        }
        else {
            to_storage2(creep)
        }
    }
};

module.exports = roleTranfer2;