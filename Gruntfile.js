/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Build configuration.
        cog: {
            options: {
                name: "time2exercise",
                external: ['coa', 'jquery', 'bootstrap'],
                src: {
                    config: ['src/settings.js', 'src/utils.js'],
                    models: ['src/models/**/*.js'],
                    data: ['data/**/*.js'],
                    code: ['src/**/*.js'],
                    css: ['css/*.css'],
                    shell: ['tools/*'],
                },
                media: {
                    pics: ['pics/**/*png'],
                    sounds: ['sounds/**/*.mp3'],
                    src: {
                        pics: {
                            files: 'dia/**/*.dia',
                            dst: 'pics/{{SUBDIR}}/{{BASENAME}}.png',
                            convert: [
                                'dia -n -e "{{DST}}" -t cairo-alpha-png "{{SRC}}"'
                            ]
                        }
                    }
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
