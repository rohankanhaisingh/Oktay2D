import * as Oktay2D from "../../../lib/Oktay2D/index.js";


const scene = new Oktay2D.CanvasScene(500, 500, document.body);

// Set the size of the scene to the window size.
scene.SetSize(window.innerWidth, window.innerHeight);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer);


const mainSong = new Oktay2D.AudioNode(document.querySelector(".media-song-01"), {
    fftSize: 256
});

/**@type {HTMLVideoElement} */
const bgVideo = document.querySelector(".media-video-01");

mainSong.SetGain(-1);
mainSong.SetVolume(.5);

function createGUI() {

    const videoPlayer = new Oktay2D.Rectangle(0, 0, scene.width, scene.height + 20, {
        backgroundImage: document.querySelector(".media-video-01"),
        filter: "hue-rotate(60deg)"
    });

    const songTitle = new Oktay2D.TextNode("Triglyceride", scene.width / 2, (scene.height / 2) - 200, {
        textAlign: "center",
        font: "90px 'Feeling Lovely'",
        strokeColor: "#fff",
        strokeWidth: 1,
        shadowBlur: 30,
        shadowColor: "#fff"
    });

    const horizontalLine = new Oktay2D.Rectangle((scene.width / 2) - (200), scene.height / 2 - 100, 400, 5, {
        backgroundColor: "#fff",
        glowStrength: 20,
    });

    const footer = new Oktay2D.TextNode("This visualizer has been made using Oktay2D | Babah Gee", 100, scene.height - 60, {
        font: "12px Montserrat thin",
        textColor: "#fff"
    });

    renderer.Add([videoPlayer, songTitle, horizontalLine, footer]);

    return videoPlayer;
}

function createSpectrum() {

    const spectrumPadding = 500,
        spectrumWaveFrequencyWidth = (scene.width - (spectrumPadding * 2)) / mainSong.frequencyBinCount;

    const spectrumFrequencies = [];

    for (let i = 0; i < mainSong.frequencyBinCount; i++) {

        const frequency = new Oktay2D.Rectangle(spectrumPadding + (i * spectrumWaveFrequencyWidth), scene.height / 2 + 100, spectrumWaveFrequencyWidth, 0, {
            backgroundColor: "#fff",
            glowStrength: 10,
            globalCompositeOperation: "luminosity"
        });

        renderer.Add(frequency);

        spectrumFrequencies.push(frequency);
    }

    return spectrumFrequencies;
}

const videoPlayer = createGUI(),
    spectrumFrequencies = createSpectrum();

scene.On("mouseDown", function () {
    mainSong.Play();
});

updater.On("update", function (deltaTime) {

    renderer.ClearScene();

    const bufferData = mainSong.GetByteFrequencyData(),
        averageAmplitude = Oktay2D.Math.GetAverageValueFromArray(bufferData);

    bgVideo.playbackRate = 1 + 5 / 255 * averageAmplitude;

    videoPlayer.style.filter = `brightness(${.05 + 2 / 255 * averageAmplitude})`;

    bufferData.forEach(function (amplitude, frequency) {

        spectrumFrequencies[frequency].height = -amplitude;

    });

    // document.querySelector(".gui-fpsmeter").innerHTML = updater.fps + "FPS";
});

updater.Update();