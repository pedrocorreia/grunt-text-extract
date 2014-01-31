/*
 * grunt-text-grab
 * https://github.com/pedrocorreia/text-grab
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    text_grab: {
      custom_options: {
        options: {
          pattern: '\\.[a-zA-Z][a-zA-Z0-9-]+',
          templateStart: '<table>\n',
          templateRow: '<tr><td>%s</td></tr>\n',
          templateEnd: '</table>\n',
          exceptions: ['exception'],
        },
        files: {
          'tmp/custom_options': ['test/fixtures/test.css'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'text_grab', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
