import {loadSpriteSheet} from "../loaders.js";
import Entity from "../Entity.js";
import Jump from "../traits/Jump.js";
import Movement from "../traits/Movement.js";

export function loadMainChar() {
    return loadSpriteSheet('mainChar')
        .then(sprite => {
            return createMainCharFactory(sprite);
        });
}

function createMainCharFactory(sprite) {
    const mainCharAnimation = sprite.animations.get("run");

    function routeFrame(mainChar) {
        if (mainChar.jump.falling) {
            return 'jump';
        }
        if (mainChar.movement.distance > 0) {
            if ((mainChar.velocity.x > 0 && mainChar.movement.direction < 0) || (mainChar.velocity.x < 0 && mainChar.movement.direction > 0)) {
                return 'break';
            }
            return mainCharAnimation(mainChar.movement.distance);
        }
        return 'idle';
    }

    function drawMainChar(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.movement.heading < 0);
    }

    return function createMainChar() {
        const mainChar = new Entity();
        mainChar.size.set(16, 32);
        mainChar.addTrait(new Jump());
        mainChar.addTrait(new Movement());

        mainChar.draw = drawMainChar;
        return mainChar;
    }
}