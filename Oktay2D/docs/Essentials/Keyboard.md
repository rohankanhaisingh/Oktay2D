# Keyboard functions

Here you can find all the functions that is related with
the user keyboard. 

- - -

## ``GetInputDown(key, callback);``

This function will listen for any key being pressed ``down``. 

Once a certain key has been pressed,
the ``callback`` function will be called with the event object being passed.

```ts
GetInputDown(key: string, callback: function);
```

The key has to be a string which can be a letter or the keytype, for example the letter ``w``, or the key ``uparrow``. 
See down below for more details.

## ``GetInputDown(key, callback);``

Basically the same as the function above, but it will instead listen for keys being released.

Once a certain key has been released, the ``callback`` function will be called with the event object being passed.

```ts
GetInputUp(key: string, callback: function);
```

- - -

## Possible keys

``0``
``1``
``2``
``3``
``4``
``5``
``6``
``7``
``8``
``9``
``backspace``
``tab``
``enter``
``shift``
``ctrl``
``alt``
``pausebreak``
``capslock``
``esc``
``space``
``pageup``
``pagedown``
``end``
``home``
``leftarrow``
``uparrow``
``rightarrow``
``downarrow``
``insert``
``delete``
``a``
``b``
``c``
``d``
``e``
``f``
``g``
``h``
``i``
``j``
``k``
``l``
``m``
``n``
``o``
``p``
``q``
``r``
``s``
``t``
``u``
``v``
``w``
``x``
``y``
``z``
``leftwindowkey``
``rightwindowkey``
``selectkey``
``numpad0``
``numpad1``
``numpad2``
``numpad3``
``numpad4``
``numpad5``
``numpad6``
``numpad7``
``numpad8``
``numpad9``
``multiply``
``add``
``subtract``
``decimalpoint``
``divide``
``f1``
``f2``
``f3``
``f4``
``f5``
``f6``
``f7``
``f8``
``f9``
``f10``
``f11``
``f12``
``numlock``
``scrolllock``
``semicolon``
``equalsign``
``comma``
``dash``
``period``
``forwardslash``
``graveaccent``
``openbracket``
``backslash``
``closebracket``
``singlequote``


## Examples

### Example 1: Alert on key press

```js
import * as Oktay2D from "path_to_lib";

// Listen for any 'e' key press event.
Oktay2D.GetInputDown("e", function() {

    // Show a alert,
    alert("EEEEEEEEEEEEEEEEEEE");
});
```