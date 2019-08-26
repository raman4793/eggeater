import {Vector} from './math.js'

export const SIDES = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom")
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
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
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