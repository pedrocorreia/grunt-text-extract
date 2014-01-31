/*
 * grunt-text-grab
 * https://github.com/pedrocorreia/text-grab
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('text_grab', 'Grab text from files by using regular expressions and save them to any format.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      pattern: '',
      exceptions: '',
      templateStart: '',
      templateRow: '',
      templateEnd: '',
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if ( !grunt.file.exists(filepath) ) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.pattern));

      var chunks, output, regexp, flagexception;
      var result, validChunks = [];

      regexp = new RegExp(options.pattern,'g');
      chunks = src.match(regexp);
      chunks.sort();

      chunks = chunks.filter(function(elem, pos, self) {
          return self.indexOf(elem) === pos;
      });

      for ( var i=0; i < chunks.length; i++ ) {
        flagexception = 0;
        for ( var x=0; x < options.exceptions.length; x++ ) {
          var exception = new RegExp(options.exceptions[x],'g');
          if ( chunks[i].match(exception) !== null ) {
            flagexception++;
          } 
        }
        if ( flagexception === 0 ) {
          validChunks.push(chunks[i]);
        } 
      }

      if(options.templateStart) {        
        output = options.templateStart;
      }

      for(var c = 0; c < validChunks.length; c++){
        output += options.templateRow.replace(/%s/g,validChunks[c]);
      }

      if(options.templateEnd){
        output += options.templateEnd;
      }

      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
