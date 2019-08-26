import Entity from './entity.js'
import Jump from "./traits/Jump.js";
import {loadSpriteSheet} from "./loaders.js";
import Movement from "./traits/Movement.js";
import {createAnimation} from "./animation.js";

export function createMainChar() {
    return loadSpriteSheet('mainChar')
        .then(sprite => {
            const mainChar = new Entity();
            mainChar.size.set(16, 32);
            mainChar.addTrait(new Jump());
            mainChar.addTrait(new Movement());
            const mainCharAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 10);

            function routeFrame(mainChar) {
                if (!mainChar.jump.ready) {
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

            mainChar.draw = function drawMainChar(context) {
                sprite.draw(routeFrame(this), context, 0, 0, mainChar.movement.heading < 0);
            };
            return mainChar;
        });
}