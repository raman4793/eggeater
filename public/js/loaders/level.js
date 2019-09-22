import Level from "../Level.js";
import {createBackgroundLayer, createSpriteLayer} from "../layers.js";
import {loadJson, loadSpriteSheet} from "../loaders.js";
import {Matrix} from '../math.js'

export function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y}
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;
        return expandSpan(xStart, xLength, yStart, yLength);
    } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range;
        const yLength = 1;
        return expandSpan(xStart, xLength, yStart, yLength);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        const xLength = 1;
        const yLength = 1;
        return expandSpan(xStart, xLength, yStart, yLength);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}

export function expandTiles(tiles, patterns) {
    const expandedTiles = [];

    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    walkTiles(tiles, derivedX, derivedY);
                } else {
                    expandedTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY
                    });
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);
    return expandedTiles;
}

export function loadLevel(name) {
    return loadJson(`/levels/${name}.json`)
        .then(leveSpec => Promise.all([
            leveSpec,
            loadSpriteSheet(leveSpec.spriteSheet)
        ])).then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
                return mergedTiles.concat(layerSpec.tiles)
            }, []);
            const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
            level.setCollisionGrid(collisionGrid);
            levelSpec.layers.forEach(layer => {
                const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
                const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
                level.compositor.layers.push(backgroundLayer);
            });

            const spriteLayer = createSpriteLayer(level.entities);
            level.compositor.layers.push(spriteLayer);
            return level;
        });
}

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type})
    }
    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name})
    }
    return grid;
}