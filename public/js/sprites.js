import {loadImage} from './loaders.js'
import SpriteSheet from './SpriteSheet.js'

export function loadMainCharSprite(argument) {
    return loadImage("/img/characters.gif")
        .then(image => {
            const sprites = new SpriteSheet(image, 16, 16);
            sprites.define('idle', 256, 0, 20, 32);
            return sprites;
        });
}
