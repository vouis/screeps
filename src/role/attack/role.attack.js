import {controller_North} from "../../global";

const roleAttacker = () => ({
    target: creep => {
        let flag = Game.flags.attackFlag;
        // spawn
        // if(flag&&creep.pos.roomName === flag.pos.roomName){
        //     let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
        //     if (creep.attack(spawn) === ERR_NOT_IN_RANGE) creep.moveTo(spawn)
        // }else {
        //     creep.moveTo(flag)
        // }

        if(flag&&creep.pos.roomName === flag.pos.roomName){
            //Game.creeps['C_1234'].claimController(Game.rooms.controller);
            const controller = Game.getObjectById('5bbcad009099fc012e636734');
            if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }else {
            creep.moveTo(flag)
        }
    },
})

export default roleAttacker;