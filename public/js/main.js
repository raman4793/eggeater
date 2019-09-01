import Camera from "./Camera.js";
import {loadLevel} from "./loaders/level.js"
import {createMainChar} from './entities.js'
import {createCameraLayer, createCollisionLayer} from './layers.js'
import Timer from './Timer.js'
import {setupKeyboard} from "./input.js";
import {setupMouseControl} from "./debug.js";

const WIDTH = 740;
const HEIGHT = 400;
const canvas = document.getElementById("screen");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext("2d");


Promise.all([
    createMainChar(),
    loadLevel('1-1')
]).then(([mainChar, level]) => {
    const camera = new Camera();
    level.entities.add(mainChar);
    window.level = level;
    mainChar.position.set(0, HEIGHT - (16 * 5));
    mainChar.velocity.set(0, 0);

    const input = setupKeyboard(mainChar);
    input.listenTo(window);

    level.compositor.layers.push(createCollisionLayer(level));
    level.compositor.layers.push(createCameraLayer(camera))

    setupMouseControl(canvas, mainChar, camera);

    const timer = new Timer(1 / 60);

    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        if (mainChar.position.x > 100) {
            camera.position.x = mainChar.position.x - 100;
        }
        level.compositor.draw(context, camera);
    };
    timer.start();
});
