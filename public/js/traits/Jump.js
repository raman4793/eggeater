import {SIDES, Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.5;
        this.duration = 0.3;
        this.engageTime = 0;
        this.velocity = 200;
    }

    get falling() {
        return this.ready < 0;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
        /*        if (this.ready > 0) {
                    this.engageTime = this.duration;
                }*/
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
            }
            this.requestTime -= deltaTime;
        }
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
            this.requestTime = 0;
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
