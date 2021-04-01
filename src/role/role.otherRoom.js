import {
    find_building,
    find_structure_or_source,
    to_destroy_building,
    source_North,
    container_North,
    moveto_Target,
} from "../global";

const otherRoom= () => ({
    source: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'))
        }
        else{
            find_structure_or_source(creep, source_North, container_North)
        }
    },
    target: creep => {
        to_destroy_building(creep);
        find_building(creep)
        moveto_Target(creep);
    },
    switch: creep => creep.updateState()
})

export default otherRoom;