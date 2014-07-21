module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['./routes/*.js']
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};