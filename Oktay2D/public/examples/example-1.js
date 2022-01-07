/**
 *  Example 1: Generating random squares
 *  
 *  Used all the in-build methods and properties to create this example.
 * 
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(500, 500, document.body);

scene.SetSize(window.innerWidth, window.innerHeight);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

const renderer = new Oktay2D.Renderer(scene, { willReadFrequently: true });

for (let i = 0; i < 100; i++) {

    const x = Oktay2D.Math.RandomBetween(0, scene.width),
        y = Oktay2D.Math.RandomBetween(0, scene.height);

    const square = new Oktay2D.Rectangle(x, y, 50, 50, {
        backgroundColor: Oktay2D.ColorNode.Random("rgb")
    });

    renderer.Add(square);
}

renderer.Render();