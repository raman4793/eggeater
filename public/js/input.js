import KeyboardState from "./KeyboardState.js";

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const CTRL = 17;
const X_VELOCITY = 200;
const Y_VELOCITY = 0;
const SPACE = 32;

export function setupKeyboard(mainChar) {
    const input = new KeyboardState();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mainChar.jump.start();
        } else {
            mainChar.jump.cancel();
        }
    });
    input.addMapping(RIGHT_ARROW, keyState => {
        mainChar.movement.direction += keyState ? 1 : -1;
    });
    input.addMapping(LEFT_ARROW, keyState => {
        mainChar.movement.direction += keyState ? -1 : 1;
    });
    input.addMapping(CTRL, keyState => {
        console.log("EAT!!!");
    });

    return input;
}