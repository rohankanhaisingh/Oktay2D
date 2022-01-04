# GenerateUniqueId();

```csharp
object GenerateUniqueId(length);
```

Calling this function will generate an unique ID and returns in in a object, with methods that can manipulate the generated ID.

- - -

## Arguments

This function requires **one** argument, which has to be a ``number``. This will determinate the length of the generated
unique ID.

```ts
GenerateUniqueID(len: number);
```

- ``len``: Length of the provided ID.


## Return value

Returns an object with four properties:

- ``id``: Generated ID.
- ``timestamp``: Timestamp when ID has been created.
- ``length``: Length of the ID.
- ``filter``: Method to filter specific characters of the generated ID.

### Additional details

```ts
{
    id: string;
    timestamp: number;
    length: number;
    filter: function;
}
```

## Methods

### filter(filterName);

```ts
string: filter(filterName);
```

This method will filter specific characters or symbols from the generated ID. This method requires **one** argument that has to be one of:

- ``number``: Filtering **all** numbers only from the generated ID.
- ``letters``: Filtering **all** letters only from the generated ID.
- ``lettersUpperCase``: Filtering **all** letters in upper case only from the generated ID.
- ``lettersLowerCase``: Filtering **all** letters in lower case only from the generated ID.

Calling this method will return a ``string``.


## Examples

### Example 1: Create a ID with a length of 12

```js
import * as Oktay2D from "path_to_lib_here";

const MyEpicID = Oktay2D.GenerateUniqueID(12);
```