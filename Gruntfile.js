module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["dist", '.tmp'],

        copy: {
            main: {
                expand: true,
                cwd: 'source/',
                src: ['**'],
                dest: 'dist/'
            }
        },

        useminPrepare: {
            html: 'source/index.html'
        },

        usemin: {
            html: ['dist/index.html']
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },

        cachebreaker: {
            dev: {
                options: {
                    match: ['dist/assets/js/phpflow.min.js', 'dist/assets/phpflow.min.css']
                },
                files: {src: ['dist/index.html']}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cache-breaker');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'useminPrepare', 'copy', 'concat', 'uglify', 'cssmin', 'usemin','cachebreaker']);

};