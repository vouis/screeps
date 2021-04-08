import {
    find_building,
    find_structure_or_source,
    to_destroy_building,
    source_North,
    container_North,
    decayTime, source_1, container_1,
} from "../global";

const northRoomRepair = () => ({
    source: creep => {
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target&&target.energy) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                find_structure_or_source(creep, source_North, container_North)
        }
    },
    target: creep => {
        if (to_destroy_building(creep)) { return; }
        if (find_building(creep, false)) { return; };
    },
    switch: creep => creep.updateState(),
    otherRoom:'E2S34'
})

export default northRoomRepair;