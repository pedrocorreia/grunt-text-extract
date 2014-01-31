'use strict';

var grunt = require('grunt');

exports.text_grab = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'Verifying result output.');

    test.done();
  },
};
