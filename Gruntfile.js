var config         = require('./config');
var securePort      = config.server.port;

module.exports = function (grunt) {
  var config = {
    jshint: {
      options: {
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
        jshintrc: '.jshintrc'
      },
      gruntfile: 'Gruntfile.js',
      server: ['controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'app.js', 'config.js'],
      client: 'public/js/**/*.js'
    },
    concat: {
      css: {
        // add your css files over here to concatenate all css files
        // let's save our site users some bandwith
        files: {
          src: ['public/vendor/bootstrap/dist/css/bootstrap.min.css', 'public/css/styles.min.css'],
          dest: 'public/css/app.styles.min.css'
        }
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      target: {
        // add your js files over here to minify them into one javascript source file
        'public/js/app.min.js': ['public/vendor/jquery/dist/jquery.min.js', 'public/vendor/bootstrap/dist/js/bootstrap.min.js', 'public/js/main.js']
      }
    },
    less: {
      src: {
        files: [{
          expand: true,
          cwd: 'public/less',
          src: '**/*.less',
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      src: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: '**/*.css',
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      all: {
        files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*'],
        options: {
          livereload: 3006
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      scripts: {
        files: 'public/js/**/*.js',
        tasks: ['jshint:client', 'uglify']
      },
      server: {
        files: '<%= jshint.server %>',
        tasks: 'jshint:server'
      },
      less: {
        files: ['public/less/**/*.less'],
        tasks: ['less', 'cssmin', 'concat:css']
      }
    },
    concurrent: {
        dev: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    nodemon: {
        dev: {
              script: 'app.js',
              options: {
                  nodeArgs: ['--debug'],
                  env: {
                      PORT: securePort
                  },
                  // omit this property if you aren't serving HTML files and
      // don't want to open a browser tab on start
              callback: function (nodemon) {
                nodemon.on('log', function (event) {
                  console.log(event.colour);
                });

                  // opens browser on initial server start
                nodemon.on('config:update', function () {
                  // Delay before server listens on port
                  setTimeout(function() {
                  require('open')('http://localhost:'+securePort);
                }, 1000);
                });

                  // refreshes browser when server reboots
                nodemon.on('restart', function () {
                  // Delay before server listens on port
                  setTimeout(function() {
                  require('fs').writeFileSync('.rebooted', 'rebooted');
                }, 1000);
                });
              }
          }
        }
    }
  };

  grunt.initConfig(config);

  // Load the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin', 'concat:css', 'concurrent']);
};
