import * as Oktay2D from "../../lib/Oktay2D/index.js";

Oktay2D.SetFlag("new-canvas-2d-api");

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer),
	camera = new Oktay2D.Camera(renderer, scene);

camera.offscreenRendering = false;

renderer.Add(new Oktay2D.Rectangle(0, 0, scene.width, scene.height, {
	backgroundColor: "#000",
	imageSmoothingEnabled: false
}));


for (var i = 0; i < 20; i++) {

	const x = Oktay2D.Math.RandomBetween(0, scene.width),
		y = Oktay2D.Math.RandomBetween(0, scene.height),
		range = Oktay2D.Math.RandomBetween(0, scene.height),
		radius = Oktay2D.Math.RandomBetween(225, 320),
		direction = Oktay2D.Math.RandomBetween(-40, 40),
		color = "#fff";

	const pointLight = new Oktay2D.PointLight(x, y, range, radius, direction, color, {
		globalCompositeOperation: "lighten",
		shadowColor: "auto",
		shadowBlur: 20
	});

	pointLight.forceRendering = true;

	renderer.Add(pointLight);

}

const rect = new Oktay2D.Rectangle(20, 20, 40, 40, {
	backgroundImage: await Oktay2D.LoadImageSync("https://png.pngitem.com/pimgs/s/445-4453622_obama-sphere-png-transparent-png.png"),
	shadowBlur: 20,
	shadowColor: "auto",
	globalCompositeOperation: "darken"
});

renderer.Add(rect);

scene.On("mouseMove", function (mouse) {

	rect.Center(mouse.x, mouse.y);

});


updater.On("update", function (deltaTime) {

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;
	document.querySelector(".gui-visible_objects").innerText = "Visible objects: " + renderer.visibleObjects.length;

});

updater.Update(Date.now());