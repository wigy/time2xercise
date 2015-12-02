/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Build configuration.
        build: {
            options: {
                name: "time2exercise",
                external: ['coa', 'jquery', 'bootstrap'],
                src: {
                    config: ['src/settings.js', 'src/utils.js'],
                    models: ['src/models/**/*.js'],
                    data: ['data/**/*.js'],
                    code: ['src/**/*.js'],
                    pics: ['pics/**/*png'],
                    sounds: ['sounds/**/*.mp3'],
                    css: ['css/*.css'],
                    shell: ['tools/*'],
                },
                index: {
                    app: 'index.html',
                    test: 'test.html',
                },
            }
        },
    });

    // List of plugins required.
    grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');

    // Default task.
    grunt.registerTask('default', ['usage']);
};
