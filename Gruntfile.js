/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        versioning: {
            options: {
                file: 'src/settings.js'
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/jquery*.js', 'lib/*.js', 'src/settings.js', 'src/utils.js', 'data/data.js', 'data/**/*.js', 'src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
          },
          dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
        },

        copy: {
            libs: {
                files: [
                    {expand: true, dest: 'lib/', flatten: true, src: ['node_modules/jquery/dist/jquery.min.*',
                                                                      'node_modules/ng-audio/dist/ng-audio.min.js',
                                                                      'node_modules/bootstrap/dist/js/bootstrap.min.js',
                                                                      'node_modules/angular/angular.min.js',
                                                                      'node_modules/angular/angular.min.map',
                                                                     ]},
                    {expand: true, dest: 'css/', flatten: true, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css']},
                    {expand: true, dest: 'fonts/', flatten: true, src: ['node_modules/bootstrap/dist/fonts/*']},
                ],
            },
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.all %>',
                tasks: ['jshint:all']
            }
        },

        availabletasks: {
            tasks: {
                options: {
                    filter: 'include',
                    tasks: ['copylibs', 'jshint', 'build', 'versioning']
                }
            }
        },

    });

    // List of plugins required.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-available-tasks');

    grunt.loadTasks('./grunt/');

    // Default task.
    grunt.registerTask('default', ['availabletasks']);

    // Custom tasks.
    grunt.registerTask('build', 'Compile compressed version of the code into dist-directory.', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('copylibs', 'Update libraries from the installed node modules.', ['copy:libs']);
};
