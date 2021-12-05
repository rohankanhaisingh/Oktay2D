export class AudioNode {
	/**
	 * Creates a default audio node. Can be used to modify and get specific data from the audio.
	 * @param {HTMLAudioElement} stream HTMLAudio element.
	 * @param {object} options
	 * 
	 * @param options.fftSize {32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768}
	 */
	constructor(stream, options) {

		if (!(stream instanceof HTMLAudioElement)) throw new Error("The given argument (as stream) is not a HTMlAudioElement instance.");

		this.stream = stream;
		this.options = options;

		/**@type {AudioContext} */
		this.ctx = new (window.AudioContext || window.webkitAudioContext)();

		/**@type {AnalyserNode} */
		this.analyser = this.ctx.createAnalyser();

		this.analyser.fftSize = typeof options.fftSize === "number" ? options.fftSize : 2048

		/**@type {MediaElementAudioSourceNode} */
		this.source = this.ctx.createMediaElementSource(stream);

		this.source.connect(this.analyser);
		this.source.connect(this.ctx.destination);

		this.frequencyBinCount = this.analyser.frequencyBinCount;

		/**@type {Uint8Array} */
		this.bufferData = new Uint8Array(this.analyser.frequencyBinCount);
	}
	GetData() {

		this.analyser.getByteFrequencyData(this.bufferData);

		return this.bufferData;

	}
}