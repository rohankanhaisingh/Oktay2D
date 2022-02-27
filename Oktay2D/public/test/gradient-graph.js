import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer);

// renderer.SetGlobalTranformation(1, 0, .3, 1, 0, 0);

let count = 3;

async function CreateGraph() {

	renderer.renderObjects = [];

	const horizontalLine = new Oktay2D.Line(200, scene.height - 80, [{ x: scene.width - 400, y: 0 }], {
		lineColor: "#000000",
		lineWidth: 5,
		lineCap: "square"
	});

	const verticalLine = new Oktay2D.Line(200, scene.height - (100 + 300), [{ x: 0, y: 320 }], {
		lineColor: "#000000",
		lineWidth: 5,
		lineCap: "square"
	});

	renderer.Add([horizontalLine, verticalLine]);

	await Animate();
}

async function Animate() {

	const padding = 200,
		graphBarCount = count,
		width = (scene.width - (padding * 2)) / graphBarCount;


	for (let i = 0; i < graphBarCount; i++) {

		const x = padding + (i * width),
			height = Oktay2D.Math.RandomBetween(1, 320);

		const graphBarGradient = renderer.CreateLinearGradient(0, 0, 0, -320, [
			{ offset: 0, color: "#8bff85" },
			{ offset: .5, color: "#ffce47" },
			{ offset: 1, color: "#ff4747" }
		]);

		const graphBar = new Oktay2D.Rectangle(x + (width / 4), scene.height - 100, width / 2, 0, {
			backgroundColor: graphBarGradient,
			borderWidth: 10
		});


		const graphBarValueText = new Oktay2D.TextNode("0", x + (width / 2 - 9), scene.height - 100, {
			font: "14px Montserrat",
			textColor: "#000",
			textAlign: "left"
		});
		graphBarValueText.SetRotation(-90 * Math.PI / 180);

		renderer.Add([graphBar, graphBarValueText]);


		Oktay2D.AnimateSingleInteger(0, height, 2000, "easeOutElastic", function (height) {

			graphBar.height = -height;

			graphBarValueText.y = (scene.height - 100) - (height + 20);
			graphBarValueText.text = Math.round(height);

		});

		await Oktay2D.WaitFor(50);

	}

	count *= 2;

	setTimeout(CreateGraph, 2000);
}

updater.On("update", function (deltaTime) {

	renderer.ClearScene();

});

updater.Update(Date.now);

await CreateGraph();