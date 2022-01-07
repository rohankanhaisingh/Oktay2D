# RandomBetween

```ts
number: RandomBetween();
```

Returns a random value between two integers. 

This function is being part of the ``Math`` object being exported from the main index file of Oktay2D.

- - -

## Arguments

This function requires two arguments which has to be all an ``integer`` (``number``). An unexpected 
argument value will return an error.

```ts
RandomBetween(number1: number, number2: number);
```

- ``number1``: A number which determinate the start value.
- ``number2``: A number which determinate the end value.

## Examples

### Example 1: Generate a random number.

```js
import * as Oktay2D from "path_to_lib";

const MyNumber = new Oktay2D.Math.RandomBetween(60, 80);

// Hopefully 69.
console.log(MyNumber);
```