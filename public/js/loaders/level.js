import Level from "../Level.js";
import {createBackgroundLayer, createSpriteLayer} from "../layers.js";
import {loadJson, loadSpriteSheet} from "../loaders.js";

export function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {
    function applyRange(tile, xStart, xLength, yStart, yLength) {
        const xEnd = xStart + xLength;
        const yEnd = yStart + yLength;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    console.log("creating pattern");
                    const tiles = patterns[tile.pattern].tiles;
                    console.log(patterns[tile.pattern]);
                    createTiles(level, tiles, patterns, derivedX, derivedY);
                } else {
                    level.tiles.set(derivedX, derivedY, {name: tile.name, type: tile.type})
                }
            }
        }
    }

    tiles.forEach(tile => {
        tile.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLength, yStart, yLength] = range;
                applyRange(tile, xStart, xLength, yStart, yLength);
            } else if (range.length === 3) {
                const [xStart, xLength, yStart] = range;
                const yLength = 1;
                applyRange(tile, xStart, xLength, yStart, yLength);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                const xLength = 1;
                const yLength = 1;
                applyRange(tile, xStart, xLength, yStart, yLength);
            }
        });
    });
}

export function loadLevel(name) {
    return loadJson(`/levels/${name}.json`)
        .then(leveSpec => Promise.all([
            leveSpec,
            loadSpriteSheet(leveSpec.spriteSheet)
        ])).then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.tiles, levelSpec.patterns);
            const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
            level.compositor.layers.push(backgroundLayer);

            const spriteLayer = createSpriteLayer(level.entities);
            level.compositor.layers.push(spriteLayer);
            return level;
        });
}