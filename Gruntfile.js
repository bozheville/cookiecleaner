module.exports = function(grunt) {
    'use strict';


    grunt.initConfig({
        jshint: {
            files: [
                'js/app.js',
                'background.js',
                'Gruntfile.js'
            ],
            options: {
                globals: {
                    angular: true,
                    chrome: true
                },
                eqeqeq : true,
                latedef: true,
                curly: true,
                forin: true,
                funcscope: true

            }
        },
        uglify: {
             my_target: {
                 files: {
                     'built.js': [
                         'bower_components/angularjs/angular.js',
                         'bower_components/underscore/underscore.js',
                         'js/app.js'
                     ]
                 }
             }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['jshint']);

};
