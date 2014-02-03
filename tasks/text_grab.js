/*
 * grunt-text-grab
 * https://github.com/pedrocorreia/text-grab
 *
 * Copyright (c) 2014 Pedro Correia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('text_grab', 'Grab text from files by using regular expressions and save them to any format.', function() {

    var options = this.options({
      pattern: undefined,
      exceptions: undefined,
      templateStart: undefined,
      templateRow: undefined,
      templateEnd: undefined,
    });

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if ( !grunt.file.exists(filepath) ) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
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

      grunt.log.writeln('Grabbed ' + chunks.length + ' unique chunks of text.');

      if(options.exceptions){        
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
        grunt.log.writeln('Removed ' + ( chunks.length - validChunks.length )  + ' chunks based on your exceptions.');
      } else {
        validChunks = chunks;
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

      grunt.file.write(f.dest, output);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};