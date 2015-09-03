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

        build: {
            options: {
                external: {
                    lib: ['coa', 'jquery', 'bootstrap', 'angular'],
                    css: ['bootstrap'],
                    font: ['bootstrap'],
                },
                settings: [],
                models: [],
                src: [],
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/jquery.min.js', 'lib/angular.min.js', 'lib/bootstrap.min.js', 'src/settings.js', 'src/utils.js', 'data/data.js', 'data/**/*.js', 'src/**/*.js'],
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

        cssmin: {
            target: {
                files: {
                    'dist/time2xercise.min.css': ['css/bootstrap.min.css', 'css/timer.css']
                }
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
                                                                      'node_modules/bootstrap/dist/js/bootstrap.min.js',
                                                                      'node_modules/angular/angular.min.js',
                                                                      'node_modules/angular/angular.min.map',
                                                                     ]},
                    {expand: true, dest: 'lib/chronicles_of_angular', flatten: false, cwd: 'node_modules/chronicles_of_angular/lib', src: ['**']},
                    {expand: true, dest: 'css/', flatten: true, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css']},
                    {expand: true, dest: 'fonts/', flatten: true, src: ['node_modules/bootstrap/dist/fonts/*']},
                ],
            },
            build: {
                files: [
                    {expand: true, src: 'fonts/**', dest: 'dist/'},
                    {expand: true, src: 'pics/**', dest: 'dist/'},
                    {expand: true, src: 'sounds/**', dest: 'dist/'},
                ],
            },
            index: {
                options: {
                    process: function(content, srcpath) {

                        // TODO: Make this separate grunt-plugin that inserts configured css and js file lists. (Use globbing!)
                        var insert = "";
                        var js = grunt.config.get('uglify.dist.dest').replace('dist/', '');
                        insert += '<script src="' + js + '"></script>\n';
                        var css = Object.keys(grunt.config.get('cssmin.target.files'));
                        for (var i = 0; i < css.length; i++) {
                            insert += '    <link rel="stylesheet" href="' + css[i].replace('dist/', '') + '">\n    ';
                        }
                        content = content.replace(/\s*<link .*?rel="stylesheet".*?>/gm, "");
                        content = content.replace(/\s*<script .*?<\/script>/gm, "");
                        content = content.replace(/<title>/gm, insert + "<title>");
                        return content;
                    }
                },
                files: [
                    {src: 'index.html', dest: 'dist/'},
                ],
            }
        },

        clean: {
            build: {
                src: ["dist/time2xercise.js"]
            }
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
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadTasks('node_modules/chronicles_of_grunt/tasks/');

    // Custom tasks.
    grunt.registerTask('oldbuild', 'Compile compressed version of the code into dist-directory.',
        ['jshint', 'concat', 'uglify', 'cssmin', 'copy:build', 'copy:index', 'clean:build']);
    grunt.registerTask('copylibs', 'Update libraries from the installed node modules.',
        ['copy:libs']);

    // Default task.
    grunt.registerTask('default', ['usage']);
};
