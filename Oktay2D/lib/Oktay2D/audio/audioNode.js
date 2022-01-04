export class AudioNode {
	/**
	 * Creates a default audio node. Can be used to modify and get specific data from the audio.
	 * @param {HTMLAudioElement | MediaStream} stream HTMLAudio element.
	 * @param {object} options
	 * 
	 * @param options.fftSize {32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768}
	 */
	constructor(stream, options) {

		if (!(stream instanceof HTMLAudioElement || stream instanceof MediaStream)) throw new Error("The given argument (as stream) is not a HTMlAudioElement instance.");

		this.stream = stream;
		this.options = options;

		/**@type {AudioContext} */
		this.ctx = new (window.AudioContext || window.webkitAudioContext)();

		/**@type {AnalyserNode} */
		this.analyser = this.ctx.createAnalyser();

		this.analyser.fftSize = typeof options.fftSize === "number" ? options.fftSize : 2048

		/**@type {MediaElementAudioSourceNode} */
		this.source = (stream instanceof HTMLAudioElement) ? this.ctx.createMediaElementSource(stream) : this.ctx.createMediaStreamSource(stream);

		this.panNode = this.ctx.createStereoPanner();
		this.panNode.connect(this.ctx.destination);

		this.gainNode = this.ctx.createGain();
		this.gainNode.connect(this.ctx.destination);

		this.source.connect(this.panNode);
		this.source.connect(this.analyser);
		this.source.connect(this.gainNode);
		this.source.connect(this.ctx.destination);

		this.frequencyBinCount = this.analyser.frequencyBinCount;

		/**@type {Uint8Array} */
		this.bufferData = new Uint8Array(this.analyser.frequencyBinCount);
	}

	// ========== Getters and setters ==========

	// Getters
	get timestamp() { return this.stream.currentTime; }
	get volume() { return this.stream.volume; }
	get duration() { return this.stream.duration; }
	get streamSource() { return this.stream.src; }
	get loop() { return this.stream.loop; } 

	// Setters
	set loop(bool) {

		if (typeof bool !== 'boolean') throw new Error(`Cannot set ${bool} as 'loop' on AudioNode since the given argument is not a boolean. Given argument type: ${typeof bool}`);

		this.stream.loop = bool;

		return this;
	}



	// ========== Public methods ==========

	/**Gets the byte frequency data. */
	GetByteFrequencyData() {

		this.analyser.getByteFrequencyData(this.bufferData);

		return this.bufferData;

	}
	/**Plays the audio node */
	Play() {

		if (!(this.stream instanceof HTMLAudioElement)) throw new Error("Cannot execute 'Play' on audio node.");

		this.stream.play();

		return this;
	}
	Pause() {

		if (!(this.stream instanceof HTMLAudioElement)) throw new Error("Cannot execute 'Pause' on audio node.");

		this.stream.pause();

		return this;
	}
	/**
	 * Sets a panning value between -1 and 1.
	 * @param {number} value
	 */
	SetPan(value) {

		if (value < -1 || value > 1) throw new Error(`Cannot set panning value on AudioNode because the given value might be either less than -1 or greater than 1. Given value: ${value}`);

		this.panNode.pan.setValueAtTime(value, this.ctx.currentTime);

		return this;
	}

	/**
	 * Sets a gain value on AudioNode.
	 * @param {number} value
	 */
	SetGain(value) {

		if (value < -1) throw new Error(`Cannot set gain value on AudioNode because the given value might be either less than 0. Given value: ${value}`);

		this.gainNode.gain.setValueAtTime(value, this.ctx.currentTime);

		return this;
	}
	/**
	 * Sets volume on AudioNode.
	 * @param {number} value
	 */
	SetVolume(value) {

		if (value < 0 || value > 1) throw new Error(`Cannot set volume value on AudioNode because the given value might be either less than 0 or greater than 1. Given value: ${value}`);

		this.stream.volume = value;

		return this;
	}
	/**
	 * Sets the timestamp on AudioNode.
	 * @param {number} value
	 */
	SetTimeStamp(value) {

		if (value < 0 || value > this.stream.duration) throw new Error(`Cannot set time stamp on AudioNode because the given value might be less than 0 or greater than ${this.stream.duration}. Given value: ${value}`);

		this.stream.currentTime = value;

		return this;
    }
}