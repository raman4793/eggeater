import {SIDES, Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = 0;
        this.duration = 0.5;
        this.engageTime = 0;
        this.velocity = 200;
    }

    get falling() {
        return this.ready < 0;
    }

    cancel() {
        this.engageTime = 0;
    }

    start() {
        if (this.ready > 0) {
            this.engageTime = this.duration;
        }
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
        this.ready--;
    }

    obstruct(entity, side) {
        if (side === SIDES.BOTTOM) {
            this.ready = 1;
        } else if (side === SIDES.TOP) {
            this.cancel();
        }
    }
}
