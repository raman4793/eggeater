import {loadSpriteSheet} from "../loaders.js";
import Entity from "../Entity.js";
import PendulumWalk from "../traits/PendulumWalk.js";

export function loadGoomba() {
    return loadSpriteSheet('goomba')
        .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {
    const goombaAnimation = sprite.animations.get("walk");

    function drawGoomba(context) {
        // sprite.draw(routeFrame(this), context, 0, 0, this.movement.heading < 0);
        sprite.draw(goombaAnimation(this.lifetime), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.velocity.x = -30;
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba;
        return goomba;
    }
}