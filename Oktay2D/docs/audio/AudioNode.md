# AudioNode

```ts
class AudioNode;
```

An ``AudioNode`` instance allows you to play audio in an advanced way. You can set post post proccesing effects and you can also
create an epic visualiser using it.

_Last edited: 04-01-2022_

- - -

## Arguments

When creating an instance, you will have to enter **2 arguments**, one is optional.

```ts
new AudioNode(stream: HTMLAudioElement, options: object);
```

- ``stream``: An HTMLAudioElement instance which will be used to manipulate.
- ``options``: Options for some methods.

### Additional details

```js
{
    stream: HTMLAudioElement;
    options: {
        fftSize: { 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 }
    }
}
```

**Note:** A higher FFT size value will cause higher CPU usage. Recommended value is 512.

## Methods

### GetByteFrequency();

```ts
Uint8Array: GetByteFrequency();
```

Will return an ``Uint8Array`` with all the value's of each frequency. Can be used to create your visualiser.

### Play();

```ts
void Play();
```

Will play the audio node.

### Pause();

```ts
void Pause();
```

Will pause the audio node.

### SetGain(value);

```ts
void SetGain(value: number);
```

Will set a gain value on the audio node. value has to be larger than ``-1``.

### SetVolume(value);

```ts
void SetVolume(value: number);
```

Will set the volume on audio node. Value has to be between 0 and 100.

### SetTimeStamp(value);

```ts
void SetTimeStamp(value: number);
```

Will set the timestamp of the audio. If the value is larger than the duration of the song, it will return an error.


## Attributes

- ``stream``: HTMLAudioElement node.
- ``options``: Giving options.
- ``ctx``: BaseAudioContext.
- ``analyser``: AnalyserNode.
- ``source``: Stream source.
- ``panNode``: StereoPanningNode,
- ``gainNode``: GainNode.
- ``frequencyBinCount``: Frequency bin count, based on FFT size.
- ``bufferData``: ``Uint8Array`` with all values of each frequency.

### Getters

#### timestamp

```ts
number: timestamp;
```

Will return the current time of the audio node.

#### volume

```ts
number: volume;
```

Will return the set volume on the audio node.

#### duration

```ts
number: duration;
```

Will return the duration of the audio node.

#### streamSource

```ts
string: streamSource;
```

Will return the given source of the stream node.

#### loop;

```ts
boolean: loop;
```

Will return or set a boolean which will allow the audio node to loop.

## Examples

### Example 1: Create a audio node and play it.

```html
...

<!-- For this example, we will create a HTML audio node and use it in our JS script -->

<audio class="my-epic-audionode">
    <source src="[path_to_file].mp4" type="audio/mp4"></source>
</audio>
```

```js
import * as Oktay2D from "[path_to_dir]/index.js";

...

// Store the html audio node in a variable.
const AudioElementNode = document.querySelector(".my-epic-audionode");

// Create a new audio node from the library.
const MyEpicAudioNode = new Oktay2D.AudioNode(AudioElementNode);

MyEpicAudioNode.Play();
```

### Example 2: Set effects on audio node.

```html
<audio class="my-epic-audionode">
    <source src="[path_to_file].mp4" type="audio/mp4"></source>
</audio>
```

```js
import * as Oktay2D from "[path_to_dir]/index.js";

...

// Store the html audio node in a variable.
const AudioElementNode = document.querySelector(".my-epic-audionode");

// Create a new audio node from the library.
const MyEpicAudioNode = new Oktay2D.AudioNode(AudioElementNode);

MyEpicAudioNode.SetPan(1); // Will set the panning all the way to your right.
MyEpicAudioNode.SetGain(100); // Will make it very earrapy.


MyEpicAudioNode.Play();
```

### Example 3: Gather buffer data from the audio node.

```html
<audio class="my-epic-audionode">
    <source src="[path_to_file].mp4" type="audio/mp4"></source>
</audio>
```

```js
import * as Oktay2D from "[path_to_dir]/index.js";

...

// Store the html audio node in a variable.
const AudioElementNode = document.querySelector(".my-epic-audionode");

// Create a new audio node from the library.
const MyEpicAudioNode = new Oktay2D.AudioNode(AudioElementNode);

MyEpicAudioNode.Play();

const BufferData = MyEpicAudioNode.GetByteFrequencyData();

BufferData.forEach(function(amplitude) {

    // The 'GetByteFrequencyData' method will return an array so you can foreach through it.
   

    // The array has frequencies from low to high, low has an index of 0 and high has in index depending on the frequencyBinCount property.
    // You can use this to create your own visualizer, using the amplitude to determinate the loudness of a frequency.

});
```