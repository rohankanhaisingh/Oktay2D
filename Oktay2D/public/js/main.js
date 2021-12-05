import * as Oktay2D from "../../lib/Oktay2D/index.js";

const Scene = new Oktay2D.CanvasScene(500, 500, document.body),
    Updater = new Oktay2D.SceneUpdater();


const MainSong = document.querySelector("audio.main-song");

const MainSongAudioNode = new Oktay2D.AudioNode(MainSong, { fftSize: 512 });

Scene.SetSize(window.innerWidth, window.innerHeight);

Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");


const Renderer = new Oktay2D.Renderer(Scene, {
    willReadFrequently: true
});

const VisualizerWidth = Scene.width / 2 - 200,
    VisualizingStartingPoint = Scene.width / 2;

let ProgressBarTracker = null,
    Title = null,
    Overlay = null,
    ProgressBarTrackerMaxWidth = Scene.width / 2 - 500,
    ProgressBarTrackerMinHeight = 5,
    ProgressBarTrackerOriginPosition = {
        x: Scene.width / 2 + (500 / 2),
        y: Scene.height - 200
    }

// Draw background.
const BackgroundRects = [];

for (let i = 0; i < 580; i++) {

    const x = Oktay2D.Math.RandomBetween(0, Scene.width),
        y = Oktay2D.Math.RandomBetween(0, Scene.height),
        width = 1,
        height = 1,
        backgroundColor = Oktay2D.Math.RandomBetween(5, 50);

    const BackgroundRect = new Oktay2D.Rectangle(x, y, width, height, {
        //backgroundColor: new Oktay2D.ColorNode([backgroundColor, backgroundColor, backgroundColor]),
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        shadowBlur: 5,
        shadowColor: "#fff"
    });

    BackgroundRect.moveSpeed = Oktay2D.Math.RandomBetween(-20, 20) / 100;

    BackgroundRects.push(BackgroundRect);

    Renderer.Add(BackgroundRect);
}

// Draw GUI
function CreateGUI() {

    Title = new Oktay2D.TextNode("Damn Daniel Type Beat", 200, 200, {
        textColor: new Oktay2D.ColorNode("#ffffff"),
        font: "90px Montserrat"
    });

    const HorizontalLine = new Oktay2D.Rectangle(200, 270, 320, 5, {
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    });

    const SubTitle = new Oktay2D.TextNode(`Me when damn daniel.`, 200, 350, {
        textColor: new Oktay2D.ColorNode("#ffffff"),
        font: "25px RobotoLight"
    });

    const CoverImage = new Oktay2D.Rectangle(200, 420, 350, 250, {
        backgroundImage: document.querySelector(".img"),
        shadowBlur: 50,
    });

    const FooterText = new Oktay2D.TextNode("This visualizer is generated using Oktay2D, an open-source 2D graphics library by Babah Gee.", 200, Scene.height - 50, {
        font: "12px RobotoLight",
        textColor: "#ababab"
    });

    const ProgressBarContainer = new Oktay2D.Rectangle(ProgressBarTrackerOriginPosition.x, ProgressBarTrackerOriginPosition.y, ProgressBarTrackerMaxWidth, 5, {
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    });

    ProgressBarTracker = new Oktay2D.Rectangle(ProgressBarTrackerOriginPosition.x, ProgressBarTrackerOriginPosition.y, 0, 5, {
        backgroundColor: "#fff",
        shadowColor: "#fff"
    });

    Overlay = new Oktay2D.Rectangle(0, 0, Scene.width, Scene.height, {
        backgroundColor: new Oktay2D.ColorNode([0, 0, 0]),
        opacity: 1
    });

    Renderer.Add([Title, HorizontalLine, SubTitle, CoverImage, FooterText, ProgressBarContainer, ProgressBarTracker, Overlay]);
}

// Draw frequency bars
const FrequencyBars = [];

for (let i = 0; i < MainSongAudioNode.frequencyBinCount; i++) {

    const x = VisualizerWidth / MainSongAudioNode.frequencyBinCount * i,
        //width = VisualizerWidth / MainSongAudioNode.frequencyBinCount;
        width = 1;

    //const Color = new Oktay2D.ColorNode("#bfb5ff");
    const Color = new Oktay2D.ColorNode("#fff");

    const fBar = new Oktay2D.Rectangle(VisualizingStartingPoint + x, Scene.height / 2, width, 5, {
        backgroundColor: Color,
        shadowBlur: 5,
        shadowColor: Color
    });

    Renderer.Add(fBar);
    FrequencyBars.push(fBar);
}

const Background = new Oktay2D.Rectangle(0, 0, Scene.width, Scene.height, {
    backgroundImage: document.querySelector(".bg")
});

CreateGUI();

Updater.On("update", function (timestamp) {

    Renderer.ClearScene();

    // Renderer.SetBackgroundColor("#000");

    Renderer.Render(Background);

    const BufferData = MainSongAudioNode.GetData();

    let i = 0,
        x = 0,
        averageFrequency = Oktay2D.Math.GetAverageValueFromArray(BufferData);

    while (i < BufferData.length) {

        const o = FrequencyBars[i];

        if (i % 2 === 0) {
            o.height = -BufferData[i];
        } else {
            o.height = BufferData[i];
        }

        i += 1;
    }

    while (x < BackgroundRects.length) {

        const b = BackgroundRects[x];

        if (b.y > Scene.height) b.y = -b.height;
        if (b.y < 0) b.y = Scene.height;
        if (b.x > Scene.width) b.x = 0;
        if (b.x < 0) b.x = Scene.width;

        b.y += b.moveSpeed * (averageFrequency * 0.1);
        b.x += b.moveSpeed * (averageFrequency * 0.1);

        x += 1;
    }

    ProgressBarTracker.width = ProgressBarTrackerMaxWidth / MainSong.duration * MainSong.currentTime;

    ProgressBarTracker.height = ProgressBarTrackerMinHeight + (10 / 120 * averageFrequency);
    ProgressBarTracker.y = ProgressBarTrackerOriginPosition.y - (ProgressBarTracker.height / 2 - 2.5);

    ProgressBarTracker.style.shadowBlur = 20 / 100 * (averageFrequency);

    Renderer.Render();

});

MainSong.addEventListener("play", async function () {

    //stream(Scene.canvas).then(async function (res) {

    //    const url = res[0],
    //        data = res[1];

    //    transcode(new Uint8Array(data));

    //});

});

MainSong.addEventListener("ended", function (event) {

    // mediaRecorder.stop();

});


Updater.Update();

function Animate() {

    if (Overlay.style.opacity > .01) {
        Overlay.style.opacity -= .01;

        window.requestAnimationFrame(Animate);
    } else {

        Overlay.Destroy();

        Overlay.style.opacity = 0;
    }
}

window.addEventListener("click", function () {
    MainSong.play();

    window.requestAnimationFrame(Animate);
})