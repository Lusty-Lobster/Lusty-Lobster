module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['**/*.js']
    },
    watch: {
      scripts: {
        files: ['**/*.js', '*.js'],
        tasks: ['jshint']
      }
    },
    nodemon: {
      script: 'index.js'
    },
    concurrent: {
      tasks: ['nodemon',  'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['concurrent']);

};