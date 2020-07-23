# component-indexer

Node module. Creates an `_index` file in a specified directory that references all of the files in that directory. This is useful for bulk importing SCSS modules or Pug mixins. Contains presets for SCSS and Pug, or options can be specified manually.

## Usage

Given this file structure—

```
  .
  └── src
      └── pug
          └── mixins
              ├── _blockquote.pug
              ├── _section.pug
              └── _card.pug
```

```js
const componentIndexer = require('component-indexer')
componentIndexer('src/pug/mixins', 'pug')
```
—the above will create `./src/pug/mixins/_index.pug` with this content:

```pug
include _blockquote
include _card
include _section
```

## Syntax

```js
componentIndexer(path, filetype [,{prefix, suffix, extension}])
```

### Options

* `path` (String) Relative path to the directory to be indexed
* `filetype`: (String) Extension of the files to be indexed
* `prefix`: (String, optional) Prepended before each file name in the index file
* `suffix`: (String, optional) Appended after each file name in the index file
* `extension`: (Boolean, optional) Include extension of each file in the index file

## Presets

If the `filetype` matches one of the presets, the values of `prefix`, `suffix`, and `extension` will use the preset values by default.

```js
presets: {
  pug:  { prefix: `include `,  suffix: ``,   extension: false },
  scss: { prefix: `@import '`, suffix: `';`, extension: false },
}
```
