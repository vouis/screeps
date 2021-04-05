import {
    controller_North,
    towerId,
    decayTime
} from "../global";


const roleClaimer = () => ({
    target: creep => {
        const room = Game.rooms['E2S34']
        if (room && room.find(FIND_HOSTILE_CREEPS)) { // 遇到invader计时，往出生点跑
            if (Memory.invader.northRoom + decayTime < Game.time) { //不在侵略时间段，记录开始时间
                Memory.invader.northRoom = Game.time;
            }
            creep.moveTo(Game.getObjectById(towerId))
        } else if (!room && Memory.invader.northRoom + decayTime < Game.time) { //没视野，不被侵略
            creep.moveTo(new RoomPosition(20, 36, 'E2S34'))
        }

        else if (Memory.invader.northRoom + decayTime < Game.time) { //当前不在侵略时间段
            if (creep.reserveController(controller_North) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_North);
            }
        }
    }
})

export default roleClaimer;