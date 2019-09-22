import {loadMainChar} from "./entities/MainChar.js";
import {loadGoomba} from "./entities/Goomba.js";

export function loadEntities() {
    const entitiyFactories = {};

    function addUs(name) {
        return factory => entitiyFactories[name] = factory;
    }

    return Promise.all([
        loadMainChar().then(addUs("mainChar")),
        loadGoomba().then(addUs("goomba"))
    ]).then(() => {
        return entitiyFactories;
    });
}