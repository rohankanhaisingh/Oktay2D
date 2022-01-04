/**
 *  Example 1: Generate random squares with random colours.
 *  
 *  Used all the in-build methods and properties to create this example.
 * 
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const Scene = new Oktay2D.CanvasScene(500, 500, document.body);

Scene.SetSize(window.innerWidth, window.innerHeight);

Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");

const Renderer = new Oktay2D.Renderer(Scene, { willReadFrequently: true });

for (let i = 0; i < 100; i++) {

    const X = Oktay2D.Math.RandomBetween(0, Scene.width),
        Y = Oktay2D.Math.RandomBetween(0, Scene.height),
        Color = Oktay2D.ColorNode.Random("rgb"),
        Size = Oktay2D.Math.RandomBetween(2, 60);

    const Square = new Oktay2D.Rectangle(X, Y, Size, Size, {
        backgroundColor: Color,
        shadowColor: Color,
        shadowBlur: 50
    });

    Renderer.Add(Square);
}

Renderer.Render();