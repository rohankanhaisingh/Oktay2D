export const ConnectedGamePads = {};

export class GamePad {
    constructor() {

    }
}

window.addEventListener("gamepadconnected", function (event) {

    const gamePad = this.navigator.getGamepads()[event.gamepad.index];

    console.log(event);
});