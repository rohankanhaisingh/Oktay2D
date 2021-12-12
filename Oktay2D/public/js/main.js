import * as Oktay2D from "../../lib/Oktay2D/index.js";

const Scene = new Oktay2D.CanvasScene(500, 500, document.body);

Scene.SetSize(window.innerWidth, window.innerHeight);

Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");

const Renderer = new Oktay2D.Renderer(Scene, { willReadFrequently: true }),
    Updater = new Oktay2D.SceneUpdater(Renderer),
    centerX = Scene.width / 2,
    centerY = Scene.height / 2,
    skewedRects = [];


function CreateBackgroundRectangles() {
    for (let i = 0; i < 120; i++) {

        const tx = Oktay2D.Math.RandomBetween(0, Scene.width),
            ty = Oktay2D.Math.RandomBetween(0, Scene.height),
            size = Oktay2D.Math.RandomBetween(5, 50),
            color = new Oktay2D.ColorNode([Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255)]);

        const Rect = new Oktay2D.Rectangle(tx, ty, size, size, {
            backgroundColor: color,
            shadowColor: color,
            shadowBlur: 20,
            opacity: .3
        });

        Rect.SetRotation(i * Math.PI / 45);

        Renderer.Add(Rect);
    }
}

let VelocityNode = new Oktay2D.TextNode("", 30, 130, {
    font: "30px Montserrat",
    textColor: "#000"
});

Renderer.Add(VelocityNode);

function CreateCircleThing() {


    for (let i = 0; i < 180; i++) {

        const width = 10,
            height = 40 + (60 / 100 * Oktay2D.Math.RandomBetween(0, 100)),
            backgroundColor = "#000";

        const Rect = new Oktay2D.Rectangle(Scene.width / (180) * i, Scene.height / 2, width, -height, {
            borderColor: backgroundColor,
            opacity: 1,
            borderWidth: 1,
        });

        // Rect.SetTransform(1, .5, 1 / -180 * (i * 2), 1, 0, 0);
        // Rect.SetRotation(i * Math.PI / 180);

        Renderer.Add(Rect);

        skewedRects.push(Rect);
    }


}

function CreateGUI() {
    const TextNode = new Oktay2D.TextNode("Graphics are being rendered using Oktay2D", 40, Scene.height - 40, {
        font: "Montserrat",
        textColor: "#000"
    });

    Renderer.Add(TextNode);
}


Updater.On("update", function (deltaTime) {

    Renderer.ClearScene();

    skewedRects.forEach(function (rect) {

        const height = rect.height + Oktay2D.Math.RandomBetween(-1, 1);

        rect.height = height;

    });

    Renderer.Render();


});

window.addEventListener("load", function () {

    // CreateBackgroundRectangles();
    CreateCircleThing();
    CreateGUI();

    Updater.Update();
});