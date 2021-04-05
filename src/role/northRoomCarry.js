import {
    find_building,
    find_structure_or_source,
    source_North,
    container_North,
    storageId,
} from "../global";

const northRoomCarry = () => ({
    source: creep => {
        const room = Game.rooms['E2S34']
        if (room && room.find(FIND_HOSTILE_CREEPS) === true) { // 遇到invader计时，往出生点跑
            if (Memory.invader.northRoom + decayTime < Game.time) { //不在侵略时间段，记录开始时间
                Memory.invader.northRoom = Game.time;
            }
            creep.moveTo(new RoomPosition(9, 2, 'E2S35'))
        } else if (Memory.invader.northRoom + decayTime > Game.time) { //在侵略时间段
            creep.moveTo(new RoomPosition(9, 2, 'E2S35'))
        }
        else if (!room && Memory.invader.northRoom + decayTime < Game.time) { //没视野，不被侵略
            creep.moveTo(new RoomPosition(20, 36, 'E2S34'))
        }
        else if (Memory.invader.northRoom + decayTime < Game.time) { //当前不在侵略时间段
            find_structure_or_source(creep, source_North, container_North)
        }
    },
    target: creep => {
        if (find_building(creep, false)) { return; };
        const storage = Game.getObjectById(storageId)
        if (storage && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
    switch: creep => creep.updateState()
})

export default northRoomCarry;