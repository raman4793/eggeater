import SpriteSheet from "./SpriteSheet.js";
import {createAnimation} from "./animation.js";

export function loadJson(url) {
    return fetch(url)
        .then(r => r.json());
}

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadSpriteSheet(name) {
    return loadJson(`/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
                });
            }
            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                });
            }
            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animationSpec => {
                    const animation = createAnimation(animationSpec.frames, animationSpec.frameLength);
                    sprites.defineAnimation(animationSpec.name, animation);
                })
            }
            return sprites;
        });
}
