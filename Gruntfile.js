module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['./routes/*.js', './bin/*.js'],
      options : {
      	curly: true,
	    eqeqeq: true,
	    eqnull: true
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};