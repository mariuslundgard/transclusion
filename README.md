Structure.js
============

This is the alpha version of Structure.js (available for development and demo use).

Try the demo or check out ```mariuslundgard/folio``` for advanced usage.


### Still to be implemented

* Objects and arrays
* Functions
* Directive rules for various HTML5 elements

## Introduction

Structure is concept for a HTML5 preprocessor (currently implemented in alpha-stage for both PHP and Javascript) based on the DOM. It's an alternative to, and more importantly an extension of, plain vanilla HTML5.

For instance, Structure generates valid HTML5 out of minimal markup:

```html
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

```html
<div each=(keyword in document.keywords)>
  <p>[[ keyword ]]</p>
</div>
```

... as well as marking up data structures:

```html
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
<link rel="stylesheet" each=(style-sheet in document.style-sheets) href="[[ style-sheet ]]">
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
