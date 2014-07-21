module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['./routes/*.js', './bin/*.js','app.js'],
      options : {
      	curly: true,
	    eqeqeq: true,
	    eqnull: true,
	    latedef: true
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};