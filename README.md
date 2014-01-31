# grunt-text-grab

> Grab and extract text chunks from files using regular expressions and save them to multiple formats.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-text-grab --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-text-grab');
```

## The "text_grab" task

### Overview
In your project's Gruntfile, add a section named `text_grab` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  text_grab: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pattern
Type: `RegExp`
Default value: none

A regular expression, as a string, that is used to find bits of text to extract from your files.

#### options.exceptions
Type: `Array`
Default value: none

An array of regular expressions, as strings, to exclude from the final output.

#### options.exceptions
Type: `Array`
Default value: none

An array of regular expressions, as strings, to exclude from the final output.

#### options.templateStart
Type: `String`
Default value: none

A string that will be prepended to the output file. Can be empty.

#### options.templateRow
Type: `String`
Default value: none

This is the bit of the template that gets reapeated on each match. Must contain the ´%s´ symbol as the placeholder for grabbed chunks.

#### options.templateEnd
Type: `String`
Default value: none

A string that will be appended to the output file. Can be empty.

### Usage Examples

In this example we'll be extracting from `style.css` all css class selectors with the exception of any containing the `exception` expression and writing them as an html table with single selector per row.

```js
grunt.initConfig({
  text_grab: {
    options: {
      pattern: '\\.[a-zA-Z][a-zA-Z0-9-]+',
      templateStart: '<table>\n',
      templateRow: '<tr><td>%s</td></tr>\n',
      templateEnd: '</table>\n',
      exceptions: ['exception'],
    },
    files: {
      'tmp/css-classes.html': ['css/style.css'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
[0.1.0](https://github.com/pedrocorreia/grunt-text-grab/archive/0.1.0.zip)
