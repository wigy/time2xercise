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
    });

    // List of plugins required.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Custom tasks.
    grunt.registerTask('release', 'Make a development or official release.', function(version) {
        var pkg = grunt.file.readJSON('package.json');
        if (arguments.length === 0) {
            grunt.log.ok("");
            grunt.log.ok("Current version is", pkg.version);
            grunt.log.ok("");
            grunt.log.ok("You can make official release by giving new version number like 'x.y.z' or");
            grunt.log.ok("you can start next release candidate by add postix like 'x.y.z-beta'.");
        } else {
            // TODO: Verify correct format.
            pkg.version = version;
            grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
            grunt.log.ok("Updated version", pkg.version, "to package.json.");
            var settings = grunt.file.read('src/settings.js');
            settings = settings.replace(/^VERSION\s*=\s*'.*'/gm, "VERSION = '" + pkg.version + "'");
            // TODO: Turn off or on DEBUG flag based on the -beta postfix.
            grunt.file.write('src/settings.js', settings);
            grunt.log.ok("Updated version", pkg.version, "to src/settings.js.");
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
