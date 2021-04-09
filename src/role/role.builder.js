import { container_2, find_building, find_structure_or_source, source_2, storageId,storageEnough } from "../global";

const roleBuilder = () => ({

    source: creep => {
        if(storageEnough()){
            find_structure_or_source(creep, source_2, container_2, storageId)
        }else{
            creep.say('能量不太够!😨');
        }
    },

    target: creep => {
        find_building(creep, true);
    },

    switch: creep => creep.updateState()
})

export default roleBuilder;