# GetAverageValueFromArray

```ts
number: GetAverageValueFromArray();
```

Returns an number which is the average value in an array.

- - - 

## Arguments

This function requires one argument which has to be an ``array`` with ``numbers`` in it.

- ``array``: Array with numbers in it. ``Array<number>``.

## Examples

### Example 1: Get the average value from an array

```js
import * as Oktay2D from "path_to_lib";

const MyArray = [120, 425, 291, 185, 129, 53, 134];

const AverageValue = Oktay2D.Math.GetAverageValueFromArray(MyArray);

console.log(AverageValue); // 191
```

### Example 2: Get the average amplitude out of all frequencies from an ``AudioNode``.

[See the doc for ``AudioNode`` for more details.](https://github.com/babahgee/Oktay2D/blob/master/Oktay2D/docs/audio/AudioNode.md)

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

MyEpicAudioNode.On("play", function() {

    // Returns the average amplitude.
    const AverageAmplitude = Oktay2D.Math.GetAverageValueFromArray(BufferData);

});
```