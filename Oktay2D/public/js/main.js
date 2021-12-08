import * as Oktay2D from "../../lib/Oktay2D/index.js";

const Scene = new Oktay2D.CanvasScene(500, 500, document.body);

Scene.SetSize(window.innerWidth, window.innerHeight);

Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");

const Renderer = new Oktay2D.Renderer(Scene, {willReadFrequently: true});

Renderer.SetBackgroundColor("#fff");

const centerX = Scene.width / 2,
    centerY = Scene.height / 2;

for (let i = 0; i < 120; i++) {

    const tx = Oktay2D.Math.RandomBetween(0, Scene.width),
        ty = Oktay2D.Math.RandomBetween(0, Scene.height),
        size = Oktay2D.Math.RandomBetween(5, 50),
        color = new Oktay2D.ColorNode([Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255)]);

    const Rect = new Oktay2D.Rectangle(tx, ty, size, size, {
        backgroundColor: color,
        shadowColor: color,
        shadowBlur: 10,
        opacity: .3
    });

    Rect.SetRotation(i * Math.PI / 45);

    Renderer.Add(Rect);
}

for (let i = 0; i < 90; i++) {

    const size = 80,
        color = new Oktay2D.ColorNode([ Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255), Oktay2D.Math.RandomBetween(0, 255) ]);

    const Rect = new Oktay2D.Rectangle(centerX, centerY, size, size, {
        backgroundColor: color,
        shadowColor: color,
        shadowBlur: 10
    });

    Rect.SetTransform(1, .5, .8, 1, 0, 0);
    Rect.SetRotation(i * Math.PI / 45);

    Renderer.Add(Rect);
}


const TextNode = new Oktay2D.TextNode("Graphics are being rendered using Oktay2D", 40, Scene.height - 40, {
    font: "Montserrat",
    textColor: "#000"
});

Renderer.Add(TextNode);

Oktay2D.RenderObject.RenderAllObjects();