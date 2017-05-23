# Demo of Apple Pencil / 3D touch API

A sketch app demo which supports __Apple Pencil__ and __3D Touch__ pressure detection currently.
Tested in Safari & Google Chrome on iOS 9.3.

[Demo](http://quietshu.github.io/apple-pencil-safari-api-test) | [Screenshot](https://raw.githubusercontent.com/quietshu/apple-pencil-safari-api-test/master/demo.png).

## Resources & refs

1. [Touch Events - Level 2, W3C Draft](https://w3c.github.io/touch-events/#widl-Touch-force)
2. [The `Touch` Object on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Touch)

|API |Capability (Apple devices with iOS 9)|
|---|---|
|force|:o:|
|radiusX|:x:|
|radiusY|:x:|
|rotationAngle|:x:|

## Pointer Events & polyfill

- [Pointer Events on W3C](https://www.w3.org/TR/pointerevents/#h2_intro)
- [Microsoft Edge](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396)

- Hand.js -> [jQuery PEP](https://github.com/jquery/PEP).
- MSPointerXXX: [MSDN Blog](https://blogs.msdn.microsoft.com/eternalcoding/2013/02/20/hand-js-a-polyfill-for-supporting-pointer-events-on-every-browser/)
