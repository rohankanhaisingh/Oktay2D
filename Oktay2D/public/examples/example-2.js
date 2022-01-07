/*
 * Creating circles on the mouse position when it's moving.
 * 
 * Made by Babah Gee
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

const renderer = new Oktay2D.Renderer(scene, {
    alpha: true,
    desynchronized: false,
    willReadFrequently: true
}),
    updater = new Oktay2D.SceneUpdater(renderer),
    circles = [];

const titleNode = new Oktay2D.TextNode("Move your mouse to spawn circles", scene.width / 2 - 300, scene.height / 2, {
    textColor: "#000",
    font: "30px Montserrat"
});

renderer.Add(titleNode);

scene.On("mouseMove", function (mouse) {

    const randomColor = Oktay2D.ColorNode.Random("rgb");

    const circle = new Oktay2D.Circle(mouse.x, mouse.y, Oktay2D.Math.RandomBetween(0, 40), 0, 2 * Math.PI, {
        backgroundColor: randomColor,
        opacity: 0,
        shadowBlur: 5,
        shadowColor: randomColor
    });

    circles.push(circle);

    renderer.Add(circle);

    setTimeout(function () {

        renderer.Remove(circle);

    }, 1000);
});

scene.On("mouseOut", function () {
    titleNode.text = "Hey! Come back";
    titleNode.x = scene.width / 2 - 100;
});

scene.On("mouseEnter", function () {
    titleNode.text = "Move your mouse to spawn circles";
    titleNode.x = scene.width / 2 - 300;
});

updater.On("update", function (deltaTime) {

    renderer.ClearScene();

    circles.forEach(function (circle) {

        if (circle.style.opacity < 1) circle.style.opacity += .05 * deltaTime;

    });


    renderer.Render();
    
});

updater.Update();