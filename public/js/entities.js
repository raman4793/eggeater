import Entity from './entity.js'
import {loadMainCharSprite} from './sprites.js'
import Velocity from './traits/Velocity.js'
import Jump from "./traits/Jump.js";

export function createMainChar() {
    return loadMainCharSprite()
        .then(sprite => {
            const mainChar = new Entity();
            mainChar.size.set(16, 32);
            mainChar.addTrait(new Jump());
            mainChar.addTrait(new Velocity());

            mainChar.draw = function drawMainChar(context) {
                // console.log(this.velocity);
                sprite.draw('idle', context, 0, 0);
            };
            return mainChar;
        });
}