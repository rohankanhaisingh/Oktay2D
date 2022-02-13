# RenderObject

```ts
class RenderObject;
```

A ``RenderObject`` instance is being used by other graphical nodes. You can see this class as a parent. Creating an instance
for this class isn't really useful unless you want to call static methods.

- - - 

## Properties

### ``id``
Unique ID generated for each render object.

### ``objectCount``
Parallel object count. First object starts with ``0``.

### ``creationTimestamp``
Timestamp when the object has been made.

## Methods

### ``Destroy();``

```ts
void Destroy();
```

Calling the ``Destroy()`` method will destroy the created instance and removes it from the array with ``RenderObject`` instances in it.

## Static properties

### ``AddToGlobalArray``
Boolean which will add every created ``RenderObject`` instance to an array (``RenderObjects``) if this property is set to ``true``.

Default is ``true``.

## Static methods.

### ``GetAllRenderObjects();``

```ts
Array: GetAllRenderObjects();
```

Will return an array with all the ``RenderObject`` instances in it.

### ``RenderAllObjects();``

```ts
void RenderAllObjects();
```

Will render **all** ``RenderObject`` instances that has been made.

