import { container_2, find_building, find_structure_or_source, source_2, storageId } from "../global";

const roleBuilder = () => ({

    source: creep => {
        find_structure_or_source(creep, source_2, container_2, storageId)
    },

    target: creep => {
        find_building(creep, true);
    },

    switch: creep => creep.updateState()
})

export default roleBuilder;