/**
 *  Example 1: Oktay-2D Startup Animation
 *  
 *  Used all the in-build methods and properties to create this example.
 * 
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const Scene = new Oktay2D.CanvasScene(500, 500, document.body);

Scene.SetSize(window.innerWidth, window.innerHeight);

Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");

const Renderer = new Oktay2D.Renderer(Scene, { willReadFrequently: true }),
    Updater = new Oktay2D.SceneUpdater(Renderer),
    Camera = new Oktay2D.Camera(Renderer, Scene),
    Squares = [];

Scene.On("mouseWheel", function (mouse, self) {

    console.log(mouse.wheelDirection);

});


const Text = new Oktay2D.TextNode("OKTAY 2D", Scene.width / 2 - 220, Scene.height / 2 + 33, {
    font: "90px Montserrat",
    shadowColor: "#ababab",
    shadowBlur: 5,
    shadowOffsetY: 30,
    shadowOffsetX: -30,
    textColor: "#000",
});

Text.SetTransform(1, 0, .8, 1, 0, 0);

Renderer.Add(Text);


for (let i = 0; i < 121; i++) {

    const X = Oktay2D.Math.RandomBetween(-Scene.width, Scene.width * 2),
        Y = Oktay2D.Math.RandomBetween(-Scene.height, Scene.height * 2),
        Color = Oktay2D.ColorNode.Random("rgb"),
        Size = Oktay2D.Math.RandomBetween(2, 60),
        ShadowOffset = Oktay2D.Math.RandomBetween(10, 30);

    const Square = new Oktay2D.Rectangle(X, Y, Size, Size, {
        backgroundColor: Color,
        shadowColor: "#ababab",
        shadowBlur: 10,
        shadowOffsetX: -ShadowOffset,
        shadowOffsetY: ShadowOffset,
    });

    Square.MoveSpeed = Oktay2D.Math.RandomBetween(1, 70) / 100;

    Square.SetTransform(1, 0, .8, 1, 0, 0);

    Squares.push(Square);

    Renderer.Add(Square);
}

const FPSMeter = new Oktay2D.TextNode("FPS", 30, 30, {
    font: "12px Consolas",
    textColor: "#000"
});

Renderer.Add(FPSMeter);


Updater.On("update", function (deltaTime) {

    Renderer.ClearScene();

    FPSMeter.text = `FPS: ${Updater.fps} - DeltaTime: ${deltaTime}`;

    if (Scene.mouse.buttons.left) {

        Camera.x = Scene.width / 2 - Scene.mouse.x;
        Camera.y = Scene.height / 2 - Scene.mouse.y;

    }

    Renderer.Render();

});

Updater.Update();