import { generateUniqueID } from "../essentials/generateUniqueId.js";
import { GetDistance } from "../essentials/math.js";
import { RenderObject } from "../essentials/renderobject.js";
import { Camera } from "../rendering/camera.js";

// ========== Definitions ==========

/**
 * @typedef DynamicMediaElementTrackOptionsDefinition
 * @property {boolean} loopAudioTrack 
 * @property {boolean} pauseOnMute
*/

/**
 * @typedef DynamicAudioControllerOptionsDefinition
 * @property {number} maxAudioTrackLength Maximum length of audio tracks being made.
*/

export class ElementTrack {

    /**@type {AudioContext} */
    ctx;

    constructor() {

        this.x = 0;
        this.y = 0;
        this.range = 0;

        this.id = generateUniqueID(18).id;
        this.creationTimestamp = Date.now();
    }
    Disconnect() {

        if (typeof this.ctx === "undefined" && !(this.ctx instanceof AudioContext)) throw new Error("Cannot disconnect audio node since no AudioContext has been specified.");

        const ctx = this.ctx;

        if (typeof this.track !== "undefined") { this.track.disconnect(); delete this.track; }
        if (typeof this.gainNode !== "undefined") { this.gainNode.disconnect(); delete this.gainNode; }
        if (typeof this.stereoPanner !== "undefined") { this.stereoPanner.disconnect(); delete this.stereoPanner; }
        if (typeof this.lowPassFilter !== "undefined") { this.lowPassFilter.disconnect(); delete this.lowPassFilter; }
        if (typeof this.element !== "undefined" && this.element instanceof HTMLAudioElement) { this.element.remove(); delete this.element;}


        delete this.ctx;

        return {
            state: "success",
            message: "Element track has succesfully been disconnected",
            timestamp: Date.now()
        };
    }
}

export class DynamicMediaElementTrack extends ElementTrack {

    /**
     * Creates a dynamic audio element track.
     * @param {AudioContext} ctx
     * @param {string} audioSource
     * @param {number} x
     * @param {number} y
     * @param {number} range
     * @param {DynamicMediaElementTrackOptionsDefinition} options
     */
    constructor(ctx, masterGain, audioSource, x, y, range, options) {

        super();

        // Define the arguments first.
        this.ctx = ctx;
        this.masterGain = masterGain;


        this.element = document.createElement("audio");
        this.x = x;
        this.y = y;
        this.options = {
            pauseOnMute: false, 
            ...options
        };

        
        this.element.src = typeof audioSource === "string" ? audioSource : null;
        this.element.loop = typeof options === "object" ? (typeof options.loopAudioTrack === "boolean" ? options.loopAudioTrack : false) : false;

        this.events = new Object();


        this.range = range;

        this.track = ctx.createMediaElementSource(this.element);

        this.gainNode = ctx.createGain();
        this.stereoPanner = ctx.createStereoPanner();
        this.lowPassFilter = ctx.createBiquadFilter();

        this.track.connect(this.lowPassFilter).connect(this.stereoPanner).connect(this.gainNode).connect(this.masterGain);

        // Events

        this.element.addEventListener("play", () => { if (typeof this.events["play"] === "function") this.events["play"](this); });
        this.element.addEventListener("playing", () => { if (typeof this.events["playing"] === "function") this.events["playing"](this); });
        this.element.addEventListener("pause", () => { if (typeof this.events["pause"] === "function") this.events["pause"](this); });
        this.element.addEventListener("timeupdate", () => { if (typeof this.events["timeupdate"] === "function") this.events["timeupdate"](this); });
        this.element.addEventListener("ended", () => { if (typeof this.events["ended"] === "function") this.events["ended"](this); });
    }


    // ========= Getters =========

    // Element getters.
    get mainVolume() { return this.element.volume; }
    get currentTime() { return this.element.currentTime; }
    get currentSource() { return this.element.currentSrc; }
    get duration() { return this.element.duration; }
    get playbackRate() { return this.element.playbackRate; }
    get loop() { return this.element.loop; }
    get autoplay() { return this.element.autoplay; }
    get pauseOnMute() { return this.options.pauseOnMute;}

    // Panning getters.
    get panValue() { return this.stereoPanner.pan.value; }
    get panAutomationRate() { return this.stereoPanner.pan.automationRate; }
    get panMinValue() { return this.stereoPanner.pan.minValue;}
    get panMaxValue() { return this.stereoPanner.pan.maxValue;}

    // Gain getters.
    get gainValue() { return this.gainNode.gain.value;}
    get gainAutomationRate() { return this.gainNode.gain.automationRate; }
    get gainMinValue() { return this.gainNode.gain.minValue;}
    get gainMaxValue() { return this.gainNode.gain.maxValue;}

    // BiquadFilter getters.
    get filterFrequencyValue() { return this.lowPassFilter.frequency.value;}
    get filterFrequencyAutomationRate() { return this.lowPassFilter.frequency.automationRate; }
    get filterFrequencyMinValue() { return this.lowPassFilter.frequency.minValue;}
    get filterFrequencyMaxValue() { return this.lowPassFilter.frequency.maxValue;}
    get filterGainValue() { return this.lowPassFilter.gain.value;}
    get filterGainAutomationRate() { return this.lowPassFilter.gain.automationRate; }
    get filterGainMinValue() { return this.lowPassFilter.gain.minValue;}
    get filterGainMaxValue() { return this.lowPassFilter.gain.maxValue;}

    // ========= Getters =========

    // Element setters.
    set mainVolume(value) { return this.element.volume = value; }
    set currentTime(value) { return this.element.currentTime = value; }
    set currentSource(value) { return this.element.currentSrc = value; }
    set duration(value) { return this.element.duration = value; }
    set playbackRate(value) { return this.element.playbackRate = value; }
    set loop(value) { return this.element.loop = value;}
    set autoplay(value) { return this.element.autoplay = value; }
    set pauseOnMute(bool) { return this.options.pauseOnMute = (typeof bool === "boolean") ? bool : false;}

    // Panning setters.
    set panValue(value) { return this.stereoPanner.pan.setValueAtTime(value, this.ctx.currentTime); }
    set panAutomationRate(value) { return this.stereoPanner.pan.automationRate = value; }
    set panMinValue(value) { return this.stereoPanner.pan.minValue = value;}
    set panMaxValue(value) { return this.stereoPanner.pan.maxValue = value; }

    // Gain setters.
    set gainValue(value) { return this.gainNode.gain.setValueAtTime(value, this.ctx.currentTime); }
    set gainAutomationRate(value) { return this.gainNode.gain.automationRate = value; }
    set gainMinValue(value) { return this.gainNode.gain.minValue = value;}
    set gainMaxValue(value) { return this.gainNode.gain.maxValue = value; }

    // BiquadFilter setters.
    set filterFrequencyValue(value) { return this.lowPassFilter.frequency.setValueAtTime(value, this.ctx.currentTime) }
    set filterFrequencyAutomationRate(value) { return this.lowPassFilter.frequency.automationRate = value; }
    set filterFrequencyMinValue(value) { return this.lowPassFilter.frequency.minValue = value;}
    set filterFrequencyMaxValue(value) { return this.lowPassFilter.frequency.maxValue = value; }
    set filterGainValue(value) { return (value >= 0 && value <= 24000) ? this.lowPassFilter.gain.setValueAtTime(value, this.ctx.currentTime) : 24000; }
    set filterGainAutomationRate(value) { return this.lowPassFilter.gain.automationRate = value; }
    set filterGainMinValue(value) { return this.lowPassFilter.gain.minValue = value; }
    set filterGainMaxValue(value) { return this.lowPassFilter.gain.maxValue = value; }

    // ========= Methods =========

    /**
     * Plays the audio track from the last saved timestamp, or on the given timestamp.
     * @param {number | null} timestamp Timestamp to start playing the audio track from.
     */
    Play(timestamp) {

        if (typeof timestamp === "number") {

            if (timestamp >= 0 && timestamp <= this.element.duration) {

                this.element.currentTime = timestamp;

                this.element.play();
            } else {
                this.element.currentTime = 0;

                this.element.play();
            }

            return;
        } 

        this.element.play();

        return this;
    }
    /** 
     * Pauses this audio track from playing.
    */
    Pause() {
        this.element.pause();

        return this;
    }

    /**
     * Creates an event listener on this audio track.
     * @param {"play" | "playing" | "pause" | "timeupdate" | "ended"} event
     * @param {any} callback
     */
    On(event, callback) {

        const events = ["play", "playing", "pause", "timeupdate", "ended"];

        if (events.includes(event)) {

            if (typeof callback === "function") {

                this.events[event] = callback;

                return this;
            } else {
                throw new Error(`Cannot create event listener since the given argument (as callback) has not been specified as a function`);
            }

        };

        throw new Error(`The given event name '${event}' is not a recognized event for this audio track.`);
    }

}

export class DynamicAudioController {
 
    /**@type {Camera} */
    renderObject;

    /**@type {AudioContext} */
    ctx;

    /**
     * Creates a new dynamic audio controller based on a render object.
     * @param {(RenderObject | null)} renderObject Render object to lock the controller on. Can be 'null' if not being defined.
     * @param {DynamicAudioControllerOptionsDefinition} options Options for this audio controller.
     */
    constructor(renderObject, options) {

        this.renderObject = renderObject;
        this.options = { ...options };

        this.ctx = new (window.AudioContext || window.webkitAudioContext);

        this.gain = this.ctx.createGain();
        this.panner = this.ctx.createStereoPanner();

        this.panner.connect(this.gain).connect(this.ctx.destination);

        this.tracks = new Array();

        this.id = generateUniqueID(18).id;

    }

    get masterVolume() { return this.gain.gain.value; }
    set masterVolume(volume) {

        if (volume >= 0) return this.gain.gain.setValueAtTime(volume, this.ctx.currentTime);

        throw new Error("Cannot set the master volume on gain node since the value is less than 0.");
    }

    get masterPanning() { return this.panner.pan.value; }
    set masterPanning(panning) {

        if (panning >= -1 && panning <= 1) return this.panner.pan.setValueAtTime(panning, this.ctx.currentTime);

        throw new Error("Cannot set the panning value since its either less than -1, or larger than 1.");
    }


    /**
     * Creates a dynamic media element track, which creates a new HTML audio node and apply effects on it.
     * @param {string} audioSource Source of the audio node.
     * @param {number} x X position of the media track.
     * @param {number} y Y position of the media track.
     * @param {number} range Media track volume range.
     * @param {DynamicMediaElementTrackOptionsDefinition} options Options
     */
    CreateDynamicMediaElementTrack(audioSource, x, y, range, options) {

        if (typeof audioSource !== "string") throw new Error("Cannot create media element track since given argument has not been specified as a string.");

        if (typeof this.options.maxAudioTrackLength === "number") {

            if (this.tracks.length <= this.options.maxAudioTrackLength) {

                const mediaTrack = new DynamicMediaElementTrack(this.ctx, audioSource, x, y, range, options);

                this.tracks.push(mediaTrack);

                return mediaTrack;
            } else {

                throw new Error("Cannot create a new media track since the length of media track has reached it's limit.");

            }

        } else {
            const mediaTrack = new DynamicMediaElementTrack(this.ctx, this.gain, audioSource, x, y, range, options);

            this.tracks.push(mediaTrack);

            return mediaTrack;
        }
    }
    /**
     * Locks audio controller to a render object.
     * @param {RenderObject} renderObject Render object to lock this controller on.
     */
    LockToObject(renderObject) {

        if (typeof renderObject === "undefined" || !(renderObject instanceof RenderObject)) throw new Error("The given argument (as renderObject) has not been specified as a RenderObject instance.");

        this.renderObject = renderObject;

        return this;
    }
    Update() {

        if (typeof this.renderObject === "undefined" || this.renderObject === null) return;

        const renderObject = this.renderObject;


        let i = 0;


        while (i < this.tracks.length) {

            /**@type {DynamicMediaElementTrack} */
            const track = this.tracks[i];

            const distance = Math.sqrt(Math.pow((renderObject.x - track.x), 2) + Math.pow((renderObject.y - track.y), 2)),
                horizontalDistance = Math.sqrt(Math.pow(renderObject.x - track.x, 2));

            if (distance <= track.range) {

                const volume = 1 - (1 / track.range * distance),
                    panning = 1 / track.range * horizontalDistance,
                    filter = track.filterFrequencyMinValue + (track.filterFrequencyMaxValue / track.range * distance);

                // console.log(panning);

                track.filterFrequencyValue = (track.filterFrequencyMinValue + track.filterFrequencyMaxValue) - filter;
                track.panValue = (track.x >= renderObject.x) ? panning : -panning;
                track.mainVolume = volume;

                if (track.element.paused && track.options.pauseOnMute) track.element.play();
            } else {

                if (track.options.pauseOnMute) {

                    if (!track.element.paused) {

                        track.element.pause();

                        track.mainVolume = 0;
                        track.filterFrequencyValue = 24000;

                    }

                } else {

                    track.mainVolume = 0;
                    track.filterFrequencyValue = 24000;
                }
            }

            i += 1;
        }

    }
    /**
     * Destroys a media element track from this controller.
     * @param {ElementTrack} mediaElementTrack
     */
    Destroy(mediaElementTrack) {

        if (typeof mediaElementTrack === "undefined" || !(mediaElementTrack instanceof ElementTrack)) throw new Error("The given argument (as mediaElementTrack) has not been specified as a ElementTrack instance.");

        let i = 0;

        while (i < this.tracks.length) {

            /**@type {ElementTrack} */
            const track = this.tracks[i];

            if (track.id === mediaElementTrack.id) {

                track.Disconnect();

                this.tracks[i] = null;

                this.tracks.splice(i, 1);

                return true;

                break;
            }

            i += 1;
        }

    }
}