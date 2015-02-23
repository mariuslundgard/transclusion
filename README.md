structure.js
============

This is the alpha version of Structure.js (available for development and demo use).

Try the demo or check out ```mariuslundgard/folio``` for advanced usage.


### Still to be implemented

* Objects and arrays
* Functions
* Directive rules for various HTML5 elements

## Introduction

Structure is a concept for a HTML5 preprocessor (currently implemented in alpha-stage for both PHP and Javascript). It’s an alternative to – and more importantly an extension of – plain vanilla HTML5.

For instance, Structure generates valid HTML5 out of minimal markup:

```
<title>Welcome to my page</title>
<h1>Hello, world!
```

Which yields:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Welcome to my page</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>
```

More interestingly, Structure enables HTML5 to do things such as printing variables and looping:

```
<div each=(keyword in document.keywords)>
  <p>[[ keyword ]]</p>
</div>
```

… as well as marking up data structures:

```
<html
  keywords=[
    'structure',
    'example',
    'html5',
    'superset'
  ]
  style-sheets=[
    'normalize.css',
    'core.css'
  ]>
<link
  each=(style-sheet in document.style-sheets)
  rel="stylesheet"
  href="[[ style-sheet ]]">
```

The example above will yield:

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="keywords" value="structure, example, html5, superset">
  <link rel="stylesheet" href="normalize.css">
  <link rel="stylesheet" href="core.css">
  <title></title>
</head>
<body></body>
</html>
```

## Directives

Similar to AngularJS’ concept of directives, Structure can be extended to manage custom elements:

```js
var doc = new structure.Document(),
    api = require('api'); // `api`: some client or server side api for
                          // retrieving stored documents

// add a custom directive called `transclude`
doc.addDirective('transclude', {
  allowedParentElements: [ 'body', '#flow' ],
  compile: function (node, compiler) {
    var src = node.getAttribute('src'),
        select = node.getAttribute('select');
    if (src && src = api.getDocument(src)) {
      if (! select) {
        return compiler.compileNodes(src.bodyElement.childNodes);
      }
      return compiler.compileNodes(src.querySelectorAll(select));
    }
    return compiler.compileNodes(node.childNodes);
  }
});
```

The markup now supports ```<transclude>``` elements:

```
<transclude src="/profile-assets" select="#logo">
  <p>This is the fallback content.</p>
</transclude>
```

And the way to compile this in JavaScript:

```js
// continues from the examples above ...

doc.setInput(
  '<transclude src="/profile-assets" select="#logo">\n' +
  '  <p>This is the fallback content</p>\n' +
  '</transclude>');

var html = doc.compile();
```
