# DynamicAudioController

```js
class DynamicAudioController;
```

A ``DynamicAudioController`` allows you to dynamically create and manipulate multiple audio sounds. This can be 
useful in 2D scenes, when you want to play a certain audio node just in a specific position.

_Last edited: 13-02-2022_


- [Constructor](##Constructor)
- [Properties](##Properties)
  - [renderObject](###renderObject)
  - [options](###options)
  - [ctx](###ctx)
  - [gain](###gain)
  - [panner](###panner)
  - [tracks](###tracks)
  - [id](###id)
  - [masterVolume](###masterVolume)
  - [masterPanning](###masterPanning)
- [Methods](##Methods)
  - [CreateDynamicMediaElementTrack](###CreateDynamicMediaElementTrack)
  - [LockToObject](###LockToObject)
  - [Update](###Update)
  - [Destroy](###Destroy)

- - -

## Constructor

```js
new DynamicAudioController( 
    renderObject? : RenderObject,
    options? : DynamicAudioControllerOptions
)
```

- [``renderObject``](../Graphics/RenderObject.md): RenderObject to control audio based on where the object is.
- ``options``: ``DynamicAudioController`` constructor options.

- - -

### DynamicAudioControllerOptions

```ts
interface DynamicAudioControllerOptions {
    maxAudioTrackLength: number, // Sets the maximum length of audio tracks. for this controller.
}
```

## Properties

### [``renderObject``](../Graphics/RenderObject.md)
RenderObject to control audio based on where the object is. Default is ``null``.

### [``options``](###DynamicAudioControllerOptions) 
DynamicAudioControllerOptions

### [``ctx``](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
Audio Context.

### [``gain``](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
Gain audio node, can be seen as the master gain of every track created for this controller.

### [``panner``](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)
Stereo panner node, can be seen as the master stereo panner of every track created for this controller.

### ``tracks``
Array that can only store [``ElementTrack``](ElementTrack.md) instances.

### [``id``](../Essentials/GenerateUniqueId.md)
An unique ID generated for each controller instance.

### ``masterVolume``
The master gain volume of the this entire controller. Minimum is 0, there is no maximum actually lol. Put it around 20 to completely earrape yourself.

### ``masterPanning``
The master panning of this entire controller. Minimum is -1 and maximum is 1.

## Methods

### CreateDynamicMediaElementTrack()

```ts
.CreateDynamicMediaElementTrack(
    audioSource: string,
    x: number,
    y: number,
    range: number,
    options: DynamicMediaElementTrackOptionsDefinition
) => DynamicMediaElementTrack;
```

This method creates a new [``DynamicMediaElementTrack``](./DynamicMediaElementTrack.md) instance for this controller,
allowing you to create dimensional audio and manipulate them in real time.


#### Arguments

##### ``audioSource``
The path to the audio source, which has to be a ``string``.

##### ``x``
Defines the ``x`` coordinate, which has to be a number.

##### ``y``
Defines the ``y`` coordinate, which has to be a number.

##### ``range``
Defines the audio range (in pixels), which has to be a number.

##### ``options``
[``DynamicMediaElementTrack``](DynamicMediaElementTrack.md) constructor options.

### LockToObject()

```ts
.LockToObject(
    renderObject: RenderObject
) => DynamicAudioController;
```

This method locks the controller to a certain [``RenderObject``](../Graphics/RenderObject.md) instance.

#### Arguments

##### ``renderObject``
A  [``RenderObject``](../Graphics/RenderObject.md) to lock the controller on.

### Update()

```ts
.Update() => DynamicAudioController;
```

This method updates the entire controller, can be used in a [``SceneUpdater``](../SceneUpdater.md) ``OnUpdate`` instance event.

### Destroy()

```ts
.Update(
    ElementTrack
) => boolean;
```

This method destroys (and disconnects) a [``ElementTrack``](ElementTrack.md) instance.

#### Arguments

##### ``mediaElementTrack``
The provided [``ElementTrack``](ElementTrack.md) instance you wish to destroy.