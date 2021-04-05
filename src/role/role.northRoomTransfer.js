import {
    find_container_trans,
    container_North,
    source_North,
    decayTime,
} from "../global";

const roleTransferN = () => ({
    target: creep => {
        const room = Game.rooms['E2S34']
        if (room && room.find(FIND_HOSTILE_CREEPS).length) { // 遇到invader计时，往出生点跑
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
            find_container_trans(creep, source_North, container_North)
        }

    },

})

export default roleTransferN;