path = require('path');

var TagetOutput = "test";
var SourceFolder = "test";

module.exports = function(grunt) {
    /**
    * Load Modules
    */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    
    grunt.initConfig({

        /**
         * clean all builded files
         *
         * @type {Object}
         */

        clean: {
            all: ['dist/' + TagetOutput + '/*.html', 'dist/' + TagetOutput + '/*.css'],
            css: ['dist/' + TagetOutput + '/*.css'],
            template: ['dist/' + TagetOutput + '/*.html'],
        },
        
        /**
        * Compile jade files in "src/template directory" to "dist" directory
        */

        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/'+ SourceFolder + '/jade/',
                    src: ['*.jade',
                        'element/*.jade',
                        'element/woo/*.jade',
                        'element/tokokoo/*.jade',
                        'asset/*.jade'
                    ],
                    // dest: 'dist/camera/html',
                    dest: 'dist/' + TagetOutput + '/',
                    ext: '.html',
                }]
            }
        },

        // jade: {
        //   html: {
        //     files: {
        //       'dist/test/': ['src/test/jade/*.jade']
        //     },
        //     options: {
        //       client: false
        //     }
        //   }
        // },


        /**
         * Prettify HTML Outputs
         * 
         * @type {Object}
         */

        prettify: {
            options: {
                indent: 1,
                indent_char: "  ",
                condense: true,
                brace_style: "expand",
                padcomments: true,
                indent_scripts: 'separate',
                preserve_newlines: true,
                unformatted: [
                    "pre", "a", "span"
                ]
            },
            all: {
                expand: true, 
                cwd: 'dist/' + TagetOutput + '/', 
                ext: '.html',
                src: ['*.html',
                    'element/*.html',
                    'element/woo/*.html',
                    'asset/*.html',
                ],
                dest: 'dist/' + TagetOutput + ''
            }
        },


        /**
        * Compass is awesome
        */

        compass: {                  // Task
          dist: {                   // Target
            options: {              // Target options
              config : "config.rb",
              sassDir: 'src/' + SourceFolder + '/sass',
              outputStyle: 'nested', // nested, expanded, compact, compressed.
              noLineComments: false,
              environment: "development", // or production
              imagesDir: 'dist/' + TagetOutput + '/img',
              cssDir: 'dist/' + TagetOutput + '/',
              watch: false
            }
          }
        },
        
        /**
        * Watches Jade file(s) changes and compile the changes
        */
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            css: {
              files: ['src/' + SourceFolder + '/sass/**/*'],
              tasks: ['compass'],
            },

            templates: {
                files: [
                        'src/' + SourceFolder + '/jade/*.jade',
                        'src/' + SourceFolder + '/jade/asset/*.jade',
                        'src/' + SourceFolder + '/jade/element/*.jade',
                        'src/' + SourceFolder + '/jade/element/woo/*.jade',
                        'src/' + SourceFolder + '/jade/element/tokokoo/*.jade'
                        ],
                tasks: [
                    'clean:template', 'jade', 'prettify'],
                    // 'jade'],
                options: {
                    nospawn: true
                }
            }
        }
    })
    
    /**
    * Compile jade file while on watch, but only the changed file being compiled.  
    */

    /*
        grunt.event.on('watch', function(action, filepath){
            grunt.config(
                ['jade', 'compile', 'files'], 
                [{
                    src: filepath, dest: 'dist/' + TagetOutput + '/' + path.basename(filepath, '.jade') + '.html'
                    // src: filepath
                    // dest: 'dist/camera/html/' + path.basename(filepath, '.jade') + '.html'
                }]
            );
        });
    */

    grunt.event.on('watch', function(action, filepath){
        grunt.config(
            ['clean', 'template'], 
            [
                'dist/' + TagetOutput + '/' + path.basename(filepath, '.jade') + '.html'
            ]
        );
    });

    
    /**
    * Default task
    */
    grunt.registerTask('default', [
        'clean:all',
        'compass',
        'jade',
        'prettify', 
        'watch']);
    /**
    * Styling task
    */
    grunt.registerTask('styling', [
        'clean:css',
        'compass',
        'watch']);

    /**
    * Markup Clean task
    */
    grunt.registerTask('markup', [
        'prettify'
        ]);

}