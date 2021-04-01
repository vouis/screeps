import {
    find_building,
    find_structure_or_source,
    to_destroy_building,
    source_North,
} from "../global";

const otherRoom= () => ({
    source: creep => {
        const room = Game.rooms['E2S34']
        if (!room) {
            creep.moveTo(new RoomPosition(25, 22, 'E2S34'))
        }
        else{
            find_structure_or_source(creep, source_North, null)
        }
    },
    target: creep => {
        to_destroy_building(creep);
        find_building(creep)
        //to_structure(creep,container_1)
    },
    switch: creep => creep.updateState()
})

export default otherRoom;