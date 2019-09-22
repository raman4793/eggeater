import {Vector} from './math.js'
import BoundingBox from "./BoundingBox.js";

export const SIDES = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom"),
    RIGHT: Symbol("RIGHT"),
    LEFT: Symbol("LEFT")
};

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct(deltaTime) {

    }

    update(deltaTime) {
        console.warn("Unhandled update in Trait");
    }
}

export default class Entity {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.size = new Vector();
        this.lifetime = 0;
        this.offset = new Vector(0, 0);
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.lifetime += deltaTime;
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }
}