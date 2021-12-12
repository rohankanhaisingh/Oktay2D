# RenderObject

```ts
class RenderObject;
```

A ``RenderObject`` instance is being used by other graphical nodes. You can see this class as a parent. Creating an instance
for this class isn't really useful unless you want to call static methods.

- - - 

## Properties

- ``id``: Object unique id.
- ``objectCount``: Object count, starting from zero when creating the first one.
- ``creationTimeStamp``: Timestamp when object has been made.


## Methods

### Destroy();

```ts
void Destroy();
```

Calling the ``Destroy()`` method will destroy the created instance and removes it from the array with ``RenderObject`` instances in it.

## Static methods.

### GetAllRenderObjects();

```ts
Array: GetAllRenderObjects();
```

Will return an array with all the ``RenderObject`` instances in it.

### RenderAllObjects();

```ts
void RenderAllObjects();
```

Will render **all** ``RenderObject`` instances that has been made.

