export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(position) {
        return Math.floor(position / this.tileSize);
    }

    toIndexRange(position1, position2) {
        const pMax = Math.ceil(position2 / this.tileSize) * this.tileSize;
        const range = [];
        let position = position1;
        do {
            range.push(this.toIndex(position));
            position += this.tileSize;
        } while (position < pMax);

        return range;
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;

            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {tile, x1, x2, y1, y2};
        }
    }

    searchByPosition(positionX, positionY) {
        return this.getByIndex(this.toIndex(positionX), this.toIndex(positionY));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });
        return matches;
    }
}