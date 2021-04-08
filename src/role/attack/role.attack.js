const roleAttacker = () => ({
    target: creep => {
        let flag = Game.flags.attackFlag;
        if(flag&&creep.pos.roomName === flag.pos.roomName){
            let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
            if (creep.attack(spawn) === ERR_NOT_IN_RANGE) creep.moveTo(spawn)
        }else {
            creep.moveTo(flag)
        }
    }
})

export default roleAttacker;