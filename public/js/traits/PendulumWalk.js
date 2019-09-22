import {SIDES, Trait} from "../Entity.js";

export default class PendulumWalk extends Trait {
    constructor() {
        {
            super("pendulumWalk")
            this.speed = -30;
        }
    }

    obstruct(entity, side) {
        if (side == SIDES.LEFT || side == SIDES.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        entity.velocity.x = this.speed;
    }
}