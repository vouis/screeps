import { container_1, find_structure_or_source, source_1, moveto_Target } from "../global";



const harvester = () => ({
    source: creep => {
        find_structure_or_source(creep, source_1, container_1, storageId)
    },
    target: creep => {
        moveto_Target(creep);
    },
    switch: creep => creep.updateState()
})

export default harvester;