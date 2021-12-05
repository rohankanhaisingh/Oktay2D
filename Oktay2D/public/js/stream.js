export const ffmpeg = FFmpeg.createFFmpeg({
    log: true
});


export let mediaRecorder = null;

export async function transcode(webcamData) {

    const name = "record.webm";

    await ffmpeg.load();

    console.log(true);

    ffmpeg.write(name, webcamData);

}

export function stream(canvas) {

    let recordedChunks = [],
        time = 0;

    return new Promise(function (resolve, reject) {

        const stream = canvas.captureStream(60);

        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });

        mediaRecorder.start(time);

        mediaRecorder.ondataavailable = function (event) {
            recordedChunks.push(event.data);
        }

        mediaRecorder.onstop = function (event) {


            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });

            const url = URL.createObjectURL(blob);

            blob.arrayBuffer().then(function (data) {

                resolve([url, data]);

            });
        }

    });
}