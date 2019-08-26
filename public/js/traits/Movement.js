import {Trait} from "../Entity.js";

export default class Movement extends Trait {
    constructor() {
        super("movement");
        this.direction = 0;
        this.acceleration = 400;
        this.decceleration = 300;
        this.dragFactor = 1 / 5000;
        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        const absoluteVelocityX = Math.abs(entity.velocity.x);
        if (this.direction !== 0) {
            entity.velocity.x += this.acceleration * deltaTime * this.direction;
            this.heading = this.direction;
        } else if (entity.velocity.x !== 0) {
            const decceleration = Math.min(absoluteVelocityX, this.decceleration * deltaTime);
            entity.velocity.x += entity.velocity.x > 0 ? -decceleration : decceleration;
        } else {
            this.distance = 0;
        }
        const drag = this.dragFactor * entity.velocity.x * absoluteVelocityX;
        entity.velocity.x -= drag;
        this.distance += absoluteVelocityX * deltaTime;
    }
}